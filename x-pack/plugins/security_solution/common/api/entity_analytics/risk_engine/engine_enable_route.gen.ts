/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { z } from 'zod';

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Risk Scoring API
 *   version: 1
 */

export type RiskEngineEnableResponse = z.infer<typeof RiskEngineEnableResponse>;
export const RiskEngineEnableResponse = z.object({
  success: z.boolean().optional(),
});

export type RiskEngineEnableErrorResponse = z.infer<typeof RiskEngineEnableErrorResponse>;
export const RiskEngineEnableErrorResponse = z.object({
  message: z.string(),
  full_error: z.string(),
});
