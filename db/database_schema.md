# Esquema de la Base de Datos

A continuación se muestra el esquema de la base de datos utilizando Mermaid:

```mermaid
erDiagram
    User {
        text id PK "primaryKey: true, optional: false, unique: true"
        text username "unique: true, optional: false"
        date createdAt "optional: false, default: new Date()"
        text userimage "optional: true"
        text email "optional: true, unique: false"
        boolean emailVerificated "optional: true, default: false"
        text hashedPassword "optional: true"
        text role "optional: false, default: 'user'"
        text provider "optional: false, default: 'email'"
        text providerID "optional: true, unique: true"
        number balance "optional: false, default: 0"
    }
    
    Demography {
        text id PK "optional: false, unique: true, primaryKey: true"
        text userId "optional: false, references: User.id"
        date birthdate "optional: false"
        text gender "optional: false"
        text province "optional: false"
        text workingPlace "optional: false"
        text subject "optional: false"
    }
    
    Session {
        text id PK "optional: false, unique: true"
        text userId "optional: false, references: User.id"
        date createdAt "optional: false, default: new Date()"
        number expiresAt "optional: false"
    }
    
    User ||--o{ Demography: "has"
    User ||--o{ Session: "has"
