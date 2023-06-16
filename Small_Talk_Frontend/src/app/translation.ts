export interface Translation {
    id:         string;
    name:       string;
    type:       string;
    etag:       string;
    location:   string;
    sku:        Sku;
    kind:       string;
    tags:       Tags;
    properties: Properties;
    identity:   Identity;
    systemData: SystemData;
}

export interface Identity {
    type: string;
}

export interface Properties {
    endpoint:                   string;
    internalId:                 string;
    dateCreated:                string;
    callRateLimit:              CallRateLimit;
    isMigrated:                 boolean;
    customSubDomainName:        string;
    networkAcls:                NetworkAcls;
    privateEndpointConnections: any[];
    publicNetworkAccess:        string;
    capabilities:               Sku[];
    endpoints:                  Endpoints;
    provisioningState:          string;
}

export interface CallRateLimit {
    rules: Rule[];
}

export interface Rule {
    key:           string;
    renewalPeriod: number;
    count:         number;
    matchPatterns: MatchPattern[];
}

export interface MatchPattern {
    path:   string;
    method: string;
}

export interface Sku {
    name: string;
}

export interface Endpoints {
    "TextTranslation-Global":     string;
    TextTranslation:              string;
    DocumentTranslation:          string;
    "DocumentTranslation-V1-1":   string;
    Token:                        string;
    Container:                    string;
    "Model Distribution Service": string;
}

export interface NetworkAcls {
    defaultAction:       string;
    virtualNetworkRules: any[];
    ipRules:             any[];
}

export interface SystemData {
    createdBy:          string;
    createdByType:      string;
    createdAt:          string;
    lastModifiedBy:     string;
    lastModifiedByType: string;
    lastModifiedAt:     string;
}

export interface Tags {
}

