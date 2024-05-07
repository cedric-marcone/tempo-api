```mermaid
erDiagram
  diploma ||--|{ levels: ""
  diploma ||--|{ disciplines: ""
  instructor }|--|{ diploma: "has"
  instructor }|--|{ organisation: "works in"
  instructor }|--|{ organisation: "main"
  instructor }|--|{ disciplines: "teaches"
  levels |o--|| disciplines: ""
```
