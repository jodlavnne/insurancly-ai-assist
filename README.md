# Insurancly AI

Build all of the following as one integrated, clickable Insurancly prototype. Do not create separate disconnected demos.
The primary demo journey must be:
Dashboard → New Authorization → MRI Case → Run Insurancly Pre-Check → Review Findings & Evidence → Correct/Prepare Request → Ready for NPHIES → Simulated Insurer Interaction → Insurer Intelligence
Implement all requirements below within that single workflow.

Build a polished interactive web-app prototype called Insurancly — AI-Powered Authorization Intelligence for the Saudi healthcare market.
This is a DEMO/SIMULATION only. Do not build real integrations or claim to connect to NPHIES, insurers, hospital EHRs, or government systems. Use realistic simulated data throughout.
Insurancly sits between the hospital clinical record and NPHIES:
Hospital EHR → Insurancly Pre-Check → Human Review → NPHIES → Insurer
Insurancly does NOT make insurance coverage decisions and does NOT replace NPHIES.
Its purpose is to improve authorization-request quality before submission and learn from historical hospital-insurer interactions to suggest likely next information requirements.

Create a professional Saudi healthcare enterprise interface. The visual style should feel like a real hospital/health-tech platform: clean, modern, clinical, minimal, trustworthy, with cards, status indicators, progress bars and clear hierarchy. Use the provided Insurancly logo (flowing gradient ribbon icon in blue/cyan) in the header and branding.

Create these main sections:
1. Dashboard
2. New Authorization
3. Authorization Pre-Check
4. Insurer Intelligence
5. Authorization History

The core AI architecture displayed in the product should be:
Layer 1 — Technical Compliance: NPHIES requirements, coding, mandatory fields, documentation structure.
Layer 2 — Hospital Knowledge: Hospital-approved protocols, internal documentation standards and workflows.
Layer 3 — Saudi Knowledge: Applicable Saudi clinical/regulatory guidance, national standards and SFDA information.
Layer 4 — International Knowledge: Applicable international classifications and clinical guidelines when local guidance is insufficient.
Layer 5 — Hospital-Specific Insurer Intelligence: Rolling analysis of the hospital's own authorization interactions and insurer responses.
This powers a Next-Best-Action Engine.

Always clearly distinguish:
* NPHIES technical requirements
* Clinical-documentation readiness
* Insurer interaction intelligence
Never present observed insurer behavior as an official insurer rule.
Never say that Insurancly predicts whether an authorization will be approved or rejected.
Instead use language such as: “Based on similar authorization interactions from this hospital during the previous 3 months…”
The interface should make clear that final review remains with the healthcare professional/authorization team and the final coverage decision remains with the insurer.
Use realistic but fictional patient, hospital and insurer information.

Interactive simulated authorization case:
Patient: Sara Alharbi
Age: 46
Specialty: Orthopedics
Requested Service: Lumbar Spine MRI
Diagnosis: Chronic low-back pain with radicular symptoms
Insurer: Insurer X (Demo)
Hospital: Riyadh Medical Center (Demo)

The physician has documented the clinical history and requested an MRI.
Create a button: "Run Insurancly Pre-Check"
When clicked, show an AI analysis animation progressing through the 5 intelligence layers and then display:
Authorization Readiness: 71%

Divide the analysis into separate cards:
1. NPHIES Technical Validation
✓ Required NPHIES fields complete
✓ Patient and coverage identifiers valid
✓ Diagnosis code structurally valid
✓ Requested service linked to diagnosis
✓ Encounter dates consistent
✗ Supporting imaging/report attachment missing

2. Clinical Documentation
✓ Diagnosis documented
✓ Clinical indication documented
✓ Hospital protocol criteria addressed
⚠ Previous conservative-treatment response insufficiently documented
✓ Relevant Saudi guidance reviewed

3. Evidence Retrieval
✓ Previous physiotherapy record found in EHR
✓ Analgesic treatment history found
✗ Treatment response not clearly documented
✓ Previous imaging report found but not attached

Show an Evidence Source beside each clinical recommendation:
Hospital Protocol → Saudi Guidance → International Reference
Make it visually obvious which source was actually used.

Then display:
Recommended Next Action:
“Treatment history exists in the medical record. Add the documented treatment response and attach the relevant imaging report before submission.”

Add two buttons:
- Review Evidence
- Prepare Request

Do not allow the AI to invent missing clinical information. If evidence does not exist, display:
“Unresolved — clinician input required.”

Add an expandable “Why was this flagged?” panel beside every clinical warning.
For the previous-treatment warning, display:
Evidence hierarchy used:
1. Hospital-approved Orthopedic Imaging Protocol — checked first
2. Applicable Saudi guidance — checked where needed
3. International guideline/reference — consulted only where the issue was not sufficiently addressed locally
Show small source badges: Hospital | Saudi | International.
The hierarchy is: Hospital → Saudi → International when needed.

Coding/Terminology:
Diagnosis and terminology validation referencing ICD-10-AM/Saudi/NPHIES terminology.
Medication-related cases referencing applicable SFDA information.
Every AI finding traceable to its evidence source.

Simulated historical data for Insurer Intelligence:
Similar requests, previous 3 months:
- 318 authorizations
- 74 additional-information requests
- Prior-treatment documentation frequently requested
- Imaging reports frequently requested
- 61% of additional-information requests could be addressed using information already present in the EHR

Insurancly Insight:
“In similar authorization interactions from this hospital during the previous 3 months, Insurer X frequently requested documentation of previous conservative treatment.”
Suggested next action: Include treatment history and documented response before submission.

Make the workflow interactive so clicking "Prepare Request" / resolving items updates the Authorization Readiness score (e.g. up to 100%), displays "Ready for NPHIES", allows simulating submission and viewing the resulting insurer interaction.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://insurancly-ai-assist.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b19f9ffa-16a7-412c-b48e-59e13d1437f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
