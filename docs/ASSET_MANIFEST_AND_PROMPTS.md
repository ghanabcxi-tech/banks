# BCXI-Ghana Visual Asset Manifest and Generation Prompts

## Production rule
Create 8K masters for archive and campaign use, then export web derivatives as AVIF/WebP at 1920px, 1280px and 768px widths. The live survey must not load 8K masters directly on mobile.

Do not AI-generate bank logos or branded interfaces. Obtain approved official institution logos separately. Use neutral, logo-free photorealistic environments for experience scenes.

## Folder and variable convention
`assets/institutions/{institution-slug}/logo.webp` -> institution logo
`assets/institutions/{institution-slug}/hero.webp` -> institution welcome hero
`assets/shared/*.webp` -> shared touchpoint scenes
`assets/sections/*.webp` -> questionnaire-section scenes
`assets/welcome/customer-experience-hero.webp` -> GitHub/App welcome hero

Apps Script keys:
- CX_WELCOME
- CX_TOUCHPOINT_BRANCH
- CX_TOUCHPOINT_ATM
- CX_TOUCHPOINT_MOBILE
- CX_TOUCHPOINT_WEB
- CX_TOUCHPOINT_WHATSAPP
- CX_TOUCHPOINT_USSD
- CX_TOUCHPOINT_CALLCENTRE
- CX_TOUCHPOINT_RM
- CX_SECTION_JOURNEY
- CX_SECTION_STRATEGY
- CX_SECTION_DIFFERENTIATION
- CX_SECTION_INNOVATION
- CX_SECTION_PSYCHOLOGY
- CX_SECTION_RELATIONSHIP
- CX_SECTION_RECOVERY
- CX_SECTION_CULTURE
- CX_SECTION_MEASUREMENT
- CX_SECTION_INTERNAL
- CX_SECTION_OUTCOMES
- CX_SECTION_NPS
- CX_SECTION_OVERALL

## Institution-specific assets required
For each institution in the `INSTITUTIONS` sheet create/supply:
1. `logo.webp` — official approved logo, transparent background where possible.
2. `hero.webp` — premium neutral branch/customer-service hero associated with that institution. Prefer a licensed real institution photograph. When unavailable, use a neutral generated banking scene and overlay the official logo in the UI rather than generating branded architecture.
3. Optional: `branch.webp`, `atm.webp`, `digital.webp` only when the institution has approved/licensed photography. Otherwise use shared scenes.

This keeps the minimum production set to 23 logos + 23 institution heroes + 22 shared/section assets, rather than generating hundreds of duplicated images.

## Master visual prompt — Welcome / JavaScript access page
Create an ultra-premium, photorealistic 8K editorial banking-customer-experience hero image for a Ghana-focused digital experience intelligence platform. Scene: a confident diverse Ghanaian adult customer in a modern Tier-1 banking environment, with subtle visual storytelling connecting a contemporary branch, ATM, smartphone banking, call-centre support and a professional relationship manager. The composition must feel coherent and realistic, not a collage. Use sophisticated architectural lighting, polished glass, natural skin texture, restrained digital intelligence cues, clean depth of field, premium corporate photography, high dynamic range, realistic reflections and physically accurate materials. Leave generous negative space on the left for a large web headline and CTA. Palette: deep navy, refined cobalt, subtle cyan and restrained warm-gold highlights. No bank logos, no fake brand names, no readable interface text, no floating nonsense glyphs, no cartoon style, no exaggerated holograms, no watermark. Landscape 16:9 master, safe crop for 4:5 and mobile portrait.

## Shared touchpoint prompt template
Create a premium 8K photorealistic corporate editorial photograph representing **{TOUCHPOINT}** in Ghana's banking sector. Show a realistic Ghanaian customer and professional service environment, with natural interaction, credible banking equipment, clean contemporary architecture, high-end but believable service design, accurate human anatomy, natural expressions and documentary-level realism. The image must communicate **{EXPERIENCE_SIGNAL}** without showing text or brand marks. Leave clear negative space for UI overlays. Deep navy/cobalt visual language with natural environmental colours. No logo, no fake text, no collage, no illustration, no excessive futuristic effects.

Touchpoint substitutions:
- Banking hall -> orderly branch journey, queue visibility, staff attentiveness, comfortable service environment.
- ATM -> safe, clean, accessible self-service transaction.
- Mobile banking -> customer completing a banking task on smartphone; screen unreadable/abstract.
- Internet banking -> laptop-based banking in a secure professional/home environment.
- WhatsApp banking -> conversational support on smartphone; no readable chat text.
- USSD -> simple feature-phone/smartphone short-code interaction; no readable code.
- Call centre -> professional agent with headset supporting customer issue resolution.
- Relationship manager -> one-to-one advisory discussion with trust and attention.

## Ten section image prompts
1. CX Foundations/Journey — one coherent banking journey flowing from information search to onboarding, routine use, digital channel and problem resolution; realistic integrated scene.
2. CX Strategy — senior banking leadership reviewing customer-journey evidence and service priorities; strategic but customer-centred.
3. Differentiation — customer choosing confidently based on trust, speed, consistency and human professionalism; no competing logos.
4. Service Innovation — seamless omnichannel banking with branch, mobile and human assistance presented as one realistic ecosystem.
5. Customer Psychology — empathetic employee listening to a concerned customer; visual emphasis on fairness, clarity and low effort.
6. Long-Term Relationship — trusted relationship manager and long-term customer in a professional advisory conversation.
7. Service Recovery — calm, empowered staff resolving a customer problem with visible attentiveness and reassurance.
8. Service Culture — coordinated frontline team and manager collaborating around customer needs.
9. Measurement/VOC — CX team reviewing anonymous feedback patterns and journey performance on clean dashboards with no readable text.
10. Internal Enablement — back-office and frontline coordination enabling a smooth customer request, with realistic operations setting.

## Interface graphics prompt — Benchmark/result page background
Create a restrained premium 8K abstract-photorealistic background for a customer-experience benchmark dashboard. Visual language: layered glass, subtle data-grid geometry, soft radial light, deep navy and cobalt with cyan highlights, minimal warm gold accents. It must support white infographic cards and charts without visual noise. No numbers, no labels, no fake graphs, no text, no logos.

## Interface graphics prompt — Admin portal
Create a premium photorealistic corporate operations environment for an institutional customer-experience admin portal: customer-experience leader reviewing feedback and service-quality trends on a large monitor in a modern Ghanaian bank office. Screen content must be abstract and unreadable. Calm executive atmosphere, high trust, deep navy and cobalt visual language, natural lighting, realistic human features, negative space for dashboard UI. No logos, no fake text, no collage.
