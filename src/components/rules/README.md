# Rules Module Documentation

This module provides a scalable and reusable system for managing email filter rules with multiple filter types.

## File Structure

```
src/
├── types/
│   └── rules.ts                 # TypeScript interfaces and types
├── constants/
│   └── filterConfigs.ts         # Filter type configurations
├── utils/
│   └── ruleUtils.ts             # Utility functions for rule operations
├── hooks/
│   └── useRules.ts              # Custom hook for rule state management
├── components/
│   ├── RuleFormField.tsx        # Reusable form field component
│   ├── RuleFormDialog.tsx       # Dialog for creating/editing rules
│   ├── RulesTable.tsx           # Table component for displaying rules
│   └── rules/
│       └── README.md            # This documentation
└── pages/
    └── RulesPage.tsx            # Main rules page component
```

## Components

### RuleFormField
A reusable component that renders different input types based on field configuration:
- Text inputs
- Textarea inputs
- Select dropdowns
- Date inputs
- Switch toggles

### RuleFormDialog
A comprehensive dialog for creating and editing rules with:
- Filter type selection via tabs
- Dynamic form fields based on selected filter type
- Validation and error handling
- Support for both create and edit modes

### RulesTable
A table component that displays rules with:
- Rule information display
- Action buttons (Edit/Delete)
- Empty state handling
- Status indicators

## Filter Types

The system supports 6 different filter types:

1. **Subject Only** - Filter by email subject content
2. **Sender Only** - Filter by sender information
3. **Body Only** - Filter by email body content
4. **Domain/Exclude Domain** - Filter by sender domains
5. **Time Based** - Filter by received date range
6. **Multiple Fields** - Combine multiple filter criteria

## Adding New Filter Types

To add a new filter type:

1. **Update Types** (`src/types/rules.ts`):
   - Add new filter type to `FilterType` union
   - Create interface for the new rule type
   - Add to `Rule` union type

2. **Update Configurations** (`src/constants/filterConfigs.ts`):
   - Add configuration object to `FILTER_TYPE_CONFIGS`
   - Define fields, labels, descriptions, and icons

3. **Update Utils** (`src/utils/ruleUtils.ts`):
   - Update `determineFilterType` function
   - Update `getRuleDisplayInfo` function if needed

4. **Update Components**:
   - Add new tab in `RuleFormDialog`
   - Update any type-specific logic

## API Integration

The system sends different payloads based on filter type:

### Subject Only
```json
{
  "name": "Test Subject Only",
  "subject_match_type": "contains",
  "subject_value": "Captivate your audience",
  "is_active": true
}
```

### Sender Only
```json
{
  "name": "Test Sender Only",
  "sender_match_type": "contains",
  "sender_value": "paypal.com",
  "is_active": true
}
```

### Body Only
```json
{
  "name": "Test Body Only",
  "body_match_type": "contains",
  "body_value": "urgent payment",
  "is_active": true
}
```

### Domain/Exclude Domain
```json
{
  "name": "Test Domain Rule",
  "sender_domain": "example.com",
  "exclude_domains": "spam.com,advertising.com",
  "is_active": true
}
```

### Time Based
```json
{
  "name": "Test Time Based",
  "received_after": "2024-01-01T00:00:00Z",
  "received_before": "2024-12-31T23:59:59Z",
  "is_active": true
}
```

### Multiple Fields
```json
{
  "name": "Test Subject and Sender",
  "subject_match_type": "contains",
  "subject_value": "statement",
  "sender_match_type": "contains",
  "sender_value": "bank.com",
  "is_active": true
}
```

## Benefits

1. **Scalable**: Easy to add new filter types
2. **Reusable**: Components can be used in other parts of the application
3. **Type Safe**: Full TypeScript support with proper type checking
4. **Maintainable**: Clear separation of concerns
5. **User Friendly**: Intuitive UI with proper validation and error handling 