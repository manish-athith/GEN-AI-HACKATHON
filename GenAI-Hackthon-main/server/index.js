import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error('Missing GEMINI_API_KEY in environment')
}
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

app.post('/api/generate-description', async (req, res) => {
  try {
    const { name, materials, technique, artisanStory, audience, tone } = req.body || {}

    if (!name || !materials || !technique) {
      return res.status(400).json({ error: 'name, materials, technique are required' })
    }
    if (!genAI) {
      return res.status(500).json({ error: 'Server not configured with GEMINI_API_KEY' })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 140,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    })

    const prompt = `You are a marketing copywriter for artisans. Write a compelling, culturally respectful product description that is short, precise, and strong.
Product Name: ${name}
Materials: ${materials}
Technique: ${technique}
Artisan Story: ${artisanStory || 'N/A'}
Target Audience: ${audience || 'general craft lovers'}
Tone: ${tone || 'warm, authentic, premium'}

Constraints:
- 60-90 words total. Absolutely do not exceed 90 words.
- Open with a crisp hook in 1 sentence.
- Use strong, active verbs; avoid filler and repetition.
- Highlight craftsmanship, heritage, and unique value.
- Use accessible language (no jargon), persuasive but honest.
- End with a tight call-to-action under 12 words.
`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return res.json({ description: text })
  } catch (err) {
    console.error('Gemini error:', err)
    const message = err?.response?.data || err?.message || 'Unknown error'
    return res.status(500).json({ error: 'Failed to generate description', details: message })
  }
})

// AI Business Recommendations endpoint
app.post('/api/get-recommendations', async (req, res) => {
  try {
    if (!genAI) {
      return res.status(500).json({ error: 'Server not configured with GEMINI_API_KEY' })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.3,
        topP: 0.9,
        topK: 40,
      },
    })

    // Optional context from client (e.g., region, season, sales hints)
    const context = req.body || {}

    const prompt = `You are an AI assistant that generates actionable business recommendations for artisans and small businesses.
When requested, you must always output recommendations in structured JSON format with the following fields and no extra commentary, no markdown fences:

{
  "sales_demand": [
    {
      "recommendation": "string",
      "reason": "string",
      "priority": "High | Medium | Low"
    }
  ],
  "marketing_promotion": [
    {
      "recommendation": "string",
      "reason": "string",
      "priority": "High | Medium | Low"
    }
  ],
  "pricing": [
    {
      "recommendation": "string",
      "reason": "string",
      "priority": "High | Medium | Low"
    }
  ],
  "inventory": [
    {
      "recommendation": "string",
      "reason": "string",
      "priority": "High | Medium | Low"
    }
  ]
}

Guidelines:
- Sales & Demand: factor in season, festivals, and regional occasions (e.g., Diwali, wedding season, summer sales drop).
- Marketing & Promotion: suggest trending formats (e.g., Reels, collaborations with micro-influencers).
- Pricing: suggest competitive but profitable pricing adjustments, discounts, or bulk offers.
- Inventory: suggest stocking strategies, raw material planning, or seasonal adjustments.
- Keep recommendations short, actionable, and easy to understand.
- Always return at least 2 recommendations in each category.

Client context (JSON) you may use to tailor suggestions: ${JSON.stringify(context)}

Return ONLY valid JSON matching the schema. Do not include code fences or explanations.`

    const result = await model.generateContent(prompt)
    let text = result.response.text() || ''

    // Attempt to extract JSON if model returns surrounding text
    const extractJson = (str) => {
      const start = str.indexOf('{')
      const end = str.lastIndexOf('}')
      if (start !== -1 && end !== -1 && end > start) {
        return str.slice(start, end + 1)
      }
      return str
    }

    // Strip code fences/backticks and extract JSON body
    text = text.replace(/```[a-zA-Z]*\n?|```/g, '')
    text = extractJson(text)

    try {
      const json = JSON.parse(text)
      // Ensure all keys exist
      const safe = {
        sales_demand: Array.isArray(json.sales_demand) ? json.sales_demand : [],
        marketing_promotion: Array.isArray(json.marketing_promotion) ? json.marketing_promotion : [],
        pricing: Array.isArray(json.pricing) ? json.pricing : [],
        inventory: Array.isArray(json.inventory) ? json.inventory : [],
      }
      return res.json(safe)
    } catch (e) {
      // Retry once with stricter prompt and higher token limit
      console.error('Failed to parse recommendations JSON. Raw text:', text)
      try {
        const retry = await model.generateContent(
          `${prompt}\n\nIMPORTANT: The previous response was truncated. Return COMPLETE JSON now with ALL FOUR categories present and 2-4 items each. Return ONLY JSON.`
        )
        let retryText = retry.response.text() || ''
        retryText = retryText.replace(/```[a-zA-Z]*\n?|```/g, '')
        retryText = extractJson(retryText)
        const retryJson = JSON.parse(retryText)
        const safe = {
          sales_demand: Array.isArray(retryJson.sales_demand) ? retryJson.sales_demand : [],
          marketing_promotion: Array.isArray(retryJson.marketing_promotion) ? retryJson.marketing_promotion : [],
          pricing: Array.isArray(retryJson.pricing) ? retryJson.pricing : [],
          inventory: Array.isArray(retryJson.inventory) ? retryJson.inventory : [],
        }
        return res.json(safe)
      } catch (e2) {
        console.error('Retry also failed to parse recommendations JSON.')
        return res.status(502).json({ error: 'Invalid AI response format', raw: text })
      }
    }
  } catch (err) {
    console.error('Gemini recommendations error:', err)
    const message = err?.response?.data || err?.message || 'Unknown error'
    return res.status(500).json({ error: 'Failed to get recommendations', details: message })
  }
})

const PORT = process.env.PORT || 5174
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))

