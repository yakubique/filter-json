# filter-json
This GitHub Action is designed to filter specified values from an input JSON. Its main task is to extract and retain only the desired values based on predefined criteria.

## Usage

For live examples, please see [actions](https://github.com/yakubique/filter-json/actions/workflows/test-myself.yaml)

```yaml
uses: yakubique/filter-json@v1
with:
  input: '["1.0.0","1.1.0","1.2.0","1.2.1","1.3.0"]'
  values: "1.0.0"

# result: '["1.1.0","1.2.0","1.2.1","1.3.0"]'
```

## With multiple values

```yaml
uses: yakubique/filter-json@v1
with:
  input: '["1.0.0","1.1.0","1.2.0","1.2.1","1.3.0"]'
  values: '1.0.0,1.1.0'

# result: "["1.2.0","1.2.1","1.3.0"]"
```

## With nested json

```yaml
uses: yakubique/filter-json@v1
with:
  input: '[{"name":"v0.3.26","tag_name":"v0.3.26","prerelease":false,"published_at":"2023-08-07T09:43:28Z"},{"name":"v0.3.22","tag_name":"v0.3.22","prerelease":false,"published_at":"2023-11-12T10:58:00Z"},{"name":"v0.3.23","tag_name":"v0.3.23","prerelease":false,"published_at":"2023-11-12T10:59:27Z"},{"name":"v0.3.25","tag_name":"v0.3.25","prerelease":false,"published_at":"2023-11-12T11:01:20Z"},{"name":"v0.3.31","tag_name":"v0.3.31","prerelease":false,"published_at":"2023-11-12T11:17:17Z"},{"name":"v0.3.34","tag_name":"v0.3.34","prerelease":false,"published_at":"2023-11-12T11:21:59Z"}]'
  type: "nested-json"
  key: "name"
  values: 'v0.3.22,v0.3.34'

# result: "[{"name":"The name is:v0.3.26.","tag_name":"v0.3.26","prerelease":false,"published_at":"2023-08-07T09:43:28Z"},{"name":"The name is:v0.3.23.","tag_name":"v0.3.23","prerelease":false,"published_at":"2023-11-12T10:59:27Z"},{"name":"The name is:v0.3.25.","tag_name":"v0.3.25","prerelease":false,"published_at":"2023-11-12T11:01:20Z"},{"name":"The name is:v0.3.31.","tag_name":"v0.3.31","prerelease":false,"published_at":"2023-11-12T11:17:17Z"}]"
```

## Use output

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Filter JSON
    id: filter_single_value
    uses: yakubique/filter-json@v1
    with:
      input: '["1.0.0","1.1.0","1.2.0","1.2.1","1.3.0"]'
      values: "1.0.0"
  - name: Echo output
    run: |
      echo "${{ steps.filter_single_value.outputs.result }}"
```
