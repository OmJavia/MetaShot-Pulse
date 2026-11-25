# Privacy, compliance and deliverability baseline

Not legal advice. Obtain counsel before activating a market or sending production mail.

| Market | Baseline | Product control |
|---|---|---|
| US | CAN-SPAM applies to commercial email: accurate headers/subject, postal address, clear opt-out, honor opt-outs within statutory timing | send gate, immutable unsubscribe, identity/footer validation |
| UK | PECR plus UK GDPR; B2B treatment differs by subscriber type, personal business data is still personal data | lawful-basis record, subscriber classification, suppression |
| EU/EEA | GDPR governs personal data; direct-marketing objection must stop processing; local ePrivacy laws also apply | market-specific approval, objection state, deletion workflow |
| India | DPDP Act/Rules apply according to commencement and context; consent must be clear and withdrawable where used | purpose record, consent/withdrawal handling, review gate |
| Canada | CASL and provincial rules require a separate legal review before activation | configured as research-only until counsel approval |

## Non-negotiable MVP policy

Real email is disabled in all environments. The only delivery adapter is `simulation`. A later enablement requires: market assessment, approved sending domain, SPF/DKIM/DMARC checks, mailbox and bounce event handling, unsubscribe endpoint, suppression import, rate limits, audit review, and explicit workspace enablement.

Contacts are either `publicly_listed`, `provider_enriched`, or `user_supplied`; no record may be generated from an email pattern. Keep purpose, source, collected timestamp, retention expiry, deletion request, and suppression reason.
