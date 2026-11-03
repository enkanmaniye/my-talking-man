# Avatar generation: provider comparison

Researched 2026-11-03 from vendor pages. Prices and terms change, so recheck before paying. Nothing here has been tested with real output: output quality is **unverified** for every provider until the Stage 4A trial. This is not legal advice.

## Requirement

Users upload photographs of an adult with permission, and the product generates a recognizable, realistic 3D human that loads in the browser and can talk, animate and change clothes.

## Comparison

| | MetaPerson (Avatar SDK) | Avaturn | Meshy | Tripo |
|---|---|---|---|---|
| Built for human likeness | Yes | Yes | No, general objects | No, general objects |
| Photos used | **1** front photo | **3**: front and two sides | 1–4 | Multiview |
| Output | Rigged GLB, glTF, FBX | GLB export | GLB, FBX, USDZ | Convertible formats |
| Body rig | Humanoid; Mixamo animations compatible | Yes | Auto-rig, biped | Auto-rig |
| Face animation | Facial blendshapes; ARKit not confirmed | Tradeoff below | Not mentioned | Not mentioned |
| Separate clothing | Yes | Yes (custom garments on Pro) | Not as editable garments | Segmentation only |
| Integration | REST, JS, iframe | REST, JS SDK, webhook | REST | REST |
| Speed | About 40 s, async | Async, webhook | Async | Async |
| Failure reporting | Poll status | **No failure notification** | Task status | Task status |
| Price | $800/month: 1,000 avatars, then $0.03 each | $800/month: 1,000 avatars, then $0.15 each | $20/month Pro: 1,000 credits | ¥0.07 per credit |
| Approx. per avatar | Fixed fee | Fixed fee | 35 credits | 55 credits |
| Free testing | **7-day API trial** | None stated; API is paid only | Pro needed | Not stated |
| Licence limits | Pro: under $2M revenue and funding | Pro: limited to certain startups; enterprise at $1M+ revenue | Paid plans own output | Paid plans hold rights |

## Terms that affect this product

### MetaPerson (Avatar SDK / Itseez3D)

- **Consent:** images of people may be used only with "their informed consent". Our consent flow must be worded to match.
- **Ownership:** it claims no IP in avatars, beyond what is needed to provide the service.
- **Third-party licensing:** notice is required to license or sell an avatar to a third party, and revenue sharing may be required. Whether this covers end users' avatars must be confirmed in writing.
- **Training:** the privacy policy says image data may be used to train vision algorithms, while Customer Data follows customer instructions. A written no-training instruction is needed.
- **Retention:** no period stated. Deletion is by request, with no deletion API found.
- **Other:** pornographic use is excluded, which matches our rules. Its outputs can't be used to train AI.

### Avaturn

- **Ownership:** avatars remain Avaturn's property, which is a business risk for a product built on them.
- **Commercial use:** allowed only after notifying them.
- **Consent:** third-party personal information needs that person's consent. "Suggestive" content is prohibited. Whether flirting counts should be clarified.
- **Privacy:** the policy is dated January 2023, cites the defunct Privacy Shield and describes a video scanning app, not this API. It allows anonymized data for technology improvement.
- **Realism tradeoff:** its documentation says T1 is the most realistic but has a **static face**, with no blendshapes. T2 supports ARKit blendshapes and visemes but is **less recognizable**. A talking character needs T2.

### Meshy: not suitable

- Its terms ask users not to include personally identifiable information about themselves or third parties in inputs, which a face photo appears to contradict.
- Non-Enterprise inputs may be used for training unless the user opts out, although its API page says API inputs are never used. The conflict would need resolving.
- API models are deleted after 3 days, so we would have to copy them immediately.
- Output has no facial animation or editable clothing, and its guide does not cover human likeness.

### Tripo: not suitable

- Its terms say outputs may not be "representative of real-world people". That is the purpose of this product.
- Output has the same technical limits as Meshy. Its privacy policy could not be retrieved.

### Others considered

| Option | Result |
|---|---|
| Ready Player Me | Shut down 2026-01-31, per Avatar SDK's blog (a competitor); not independently confirmed |
| Union Avatars | Offline since July 2026, per the same source |
| MetaHuman | Free under Unreal terms below $1M revenue, but Unreal-centric and heavy for WebGL, per Avatar SDK |
| Rodin (Hyper3D) | Praised for detail in a competitor's review, with no native auto-rig; not evaluated further |
| Self-hosted open-source models | Not researched. Would need paid GPUs and likely skilled tuning. Licences need checking. |

## Should we use Unity?

**Recommendation: no.** Unity is a game engine, not an avatar generator, so it adds no ability to turn photos into a character. The generation happens on the vendor's servers in every option here.

| Question | Finding |
|---|---|
| Would it improve likeness? | No. The same vendors supply the same avatars through REST. |
| Local generation? | Avatar SDK's Local Compute is an Enterprise-tier option, quoted individually |
| Licence | Personal is free. Pro at $210/month is required above $200K funding or revenue. |
| Website fit | Would replace or sit beside React Three Fiber, adding a second engine, a heavy WebGL download and more mobile risk |
| Useful? | MetaPerson's desktop editor is itself reported as a Unity WebGL build. We could embed it by iframe with no Unity work on our side. |

Revisit only if React Three Fiber fails specific tests in Stage 7.

## Recommendation

**Shortlist MetaPerson as first choice and Avaturn as comparison. Reject Meshy and Tripo.** The final choice comes after Stage 4A, based on real output.

MetaPerson leads because of ownership, a free trial, a rigged talking avatar and clearer failure handling. Its main weakness is that it takes one photo, which differs from the multiple-photo experience you want. Avaturn matches that requirement but has weaker terms, and its talking avatar is the less recognizable tier.

**Budget:** expect about $800/month for either service, regardless of how few users there are, before any annual discount. That is around 9.6K/year, plus hosting and AI.

## Stage 4A trial

1. Use photos of adults who agreed to this test.
2. Generate the same people in MetaPerson's trial. Run Avaturn only after you approve its paid access.
3. Score recognizability, skin and hair, full-body proportion, talking and expressions, clothing, file size and time.
4. Load every result in our own viewer on a desktop and a phone.
5. Get written vendor answers on training, retention, deletion, sub-processors, end-user licensing, revenue sharing, and companion and romance use.
6. Record the results here. You make the choice before any subscription starts.

If neither reaches your standard, we stop and decide together. The product will not quietly substitute a stock character.

## Sources

- [Avatar SDK API](https://avatarsdk.com/avatar-api/) · [pricing](https://avatarsdk.com/pricing-cloud/) · [EULA](https://avatarsdk.com/eula/) · [privacy](https://avatarsdk.com/privacy-policy/) · [MetaPerson docs](https://docs.metaperson.avatarsdk.com/)
- [Avaturn pricing](https://avaturn.me/pricing/) · [create avatar API](https://docs.avaturn.me/docs/integration/api/create-avatar-with-api/) · [body types](https://docs.avaturn.me/docs/integration/bodies/) · [API introduction](https://docs.avaturn.me/docs/integration/api/introduction/)
- [Meshy API credits](https://docs.meshy.ai/en/api/pricing) · [plans](https://www.meshy.ai/pricing) · [terms](https://www.meshy.ai/terms-of-use) · [acceptable use](https://www.meshy.ai/acceptable-use-policy) · [API page](https://www.meshy.ai/api) · [retention](https://docs.meshy.ai/en/api/asset-retention)
- [Tripo API](https://developers.tripo3d.com/en/docs/introduction) · [pricing](https://developers.tripo3d.com/en/pricing) · [terms](https://developers.tripo3d.com/en/terms)
- [Unity plans](https://unity.com/products) · [Avatar platforms 2026 (vendor blog)](https://avatarsdk.com/blog/2026/08/31/avatar-platforms-2026-whos-alive-whos-gone/) · [MetaHuman alternatives (vendor)](https://avatarsdk.com/metahuman-alternative/) · [Character generators (vendor)](https://www.3daistudio.com/blog/best-ai-3d-character-and-avatar-generators-2026)
