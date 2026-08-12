## ADDED Requirements

### Requirement: Derivation type catalog and multi-type node contract
The authenticated Study-scoped derivations API MUST expose the methodological Derivation Type catalog (id, name, inspiration, reference, prompt) and MUST represent each derivation node with a list of associated types (full type payloads or stable ids resolved to catalog entries). Create and update of derivation nodes MUST accept a non-empty list of type identifiers, MUST persist the association, and MUST omit impact and is_speculative from the supported write contract for new clients. Optional recall_id and tags remain supported.

#### Scenario: Catalog available to clients
- **WHEN** an authenticated Study owner requests the derivation type catalog for a Study they own (or an equivalent bundled graph/catalog endpoint defined by the implementation)
- **THEN** the response includes the seeded methodological types with name, inspiration, reference, and prompt

#### Scenario: Create with types and recall
- **WHEN** the owner creates a derivation with at least one type id and an optional recall_id belonging to the same Study
- **THEN** the created node response includes those derivation_types (or resolvable ids) and the recall_id without impact or is_speculative fields
