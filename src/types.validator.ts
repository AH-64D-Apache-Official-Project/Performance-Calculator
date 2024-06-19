/* tslint:disable */
// generated by typescript-json-validator
import Ajv, {ValidateFunction} from 'ajv';
import { AircraftData } from './types';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"unicode":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export type {AircraftData};
export const AircraftDataSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "PylonArmamentHellfire": {
      "properties": {
        "ll": {
          "enum": [
            "AGM-114A",
            "AGM-114C",
            "AGM-114K",
            "AGM-114L",
            "AGM-114M",
            "AGM-114N"
          ],
          "type": "string"
        },
        "lr": {
          "enum": [
            "AGM-114A",
            "AGM-114C",
            "AGM-114K",
            "AGM-114L",
            "AGM-114M",
            "AGM-114N"
          ],
          "type": "string"
        },
        "type": {
          "enum": [
            "hellfire"
          ],
          "type": "string"
        },
        "ul": {
          "enum": [
            "AGM-114A",
            "AGM-114C",
            "AGM-114K",
            "AGM-114L",
            "AGM-114M",
            "AGM-114N"
          ],
          "type": "string"
        },
        "ur": {
          "enum": [
            "AGM-114A",
            "AGM-114C",
            "AGM-114K",
            "AGM-114L",
            "AGM-114M",
            "AGM-114N"
          ],
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "type": "object"
    },
    "PylonArmamentNone": {
      "properties": {
        "type": {
          "enum": [
            "none"
          ],
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "type": "object"
    },
    "PylonArmamentRocket": {
      "properties": {
        "type": {
          "enum": [
            "rocket"
          ],
          "type": "string"
        },
        "zoneA": {
          "enum": [
            "M151 10LB",
            "M229 17LB",
            "M251 FLEC",
            "M257 ILUM",
            "M261 MPSM"
          ],
          "type": "string"
        },
        "zoneB": {
          "enum": [
            "M151 10LB",
            "M229 17LB",
            "M251 FLEC",
            "M257 ILUM",
            "M261 MPSM"
          ],
          "type": "string"
        },
        "zoneE": {
          "enum": [
            "M151 10LB",
            "M229 17LB",
            "M251 FLEC",
            "M257 ILUM",
            "M261 MPSM"
          ],
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "type": "object"
    }
  },
  "properties": {
    "fcrInstalled": {
      "type": "boolean"
    },
    "fuel": {
      "type": "number"
    },
    "iafsInstalled": {
      "type": "boolean"
    },
    "pylon1": {
      "anyOf": [
        {
          "$ref": "#/definitions/PylonArmamentNone"
        },
        {
          "$ref": "#/definitions/PylonArmamentHellfire"
        },
        {
          "$ref": "#/definitions/PylonArmamentRocket"
        }
      ]
    },
    "pylon2": {
      "anyOf": [
        {
          "$ref": "#/definitions/PylonArmamentNone"
        },
        {
          "$ref": "#/definitions/PylonArmamentHellfire"
        },
        {
          "$ref": "#/definitions/PylonArmamentRocket"
        }
      ]
    },
    "pylon3": {
      "anyOf": [
        {
          "$ref": "#/definitions/PylonArmamentNone"
        },
        {
          "$ref": "#/definitions/PylonArmamentHellfire"
        },
        {
          "$ref": "#/definitions/PylonArmamentRocket"
        }
      ]
    },
    "pylon4": {
      "anyOf": [
        {
          "$ref": "#/definitions/PylonArmamentNone"
        },
        {
          "$ref": "#/definitions/PylonArmamentHellfire"
        },
        {
          "$ref": "#/definitions/PylonArmamentRocket"
        }
      ]
    }
  },
  "required": [
    "fcrInstalled",
    "fuel",
    "iafsInstalled",
    "pylon1",
    "pylon2",
    "pylon3",
    "pylon4"
  ],
  "type": "object"
};
export type AValidateFunction<T> = ((data: unknown) => data is T) & Pick<ValidateFunction, 'errors'>
export const isAircraftData = ajv.compile(AircraftDataSchema) as AValidateFunction<AircraftData>;
export default function validate(value: unknown): AircraftData {
  if (isAircraftData(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isAircraftData.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'AircraftData'})
    );
  }
}