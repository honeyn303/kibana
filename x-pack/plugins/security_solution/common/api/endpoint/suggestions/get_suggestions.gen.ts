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
 *   title: Get Suggestions Schema
 *   version: 2023-10-31
 */

import { SuccessResponse } from '../model/schema/common.gen';

export type GetEndpointSuggestionsRequestParams = z.infer<
  typeof GetEndpointSuggestionsRequestParams
>;
export const GetEndpointSuggestionsRequestParams = z.object({
  suggestion_type: z.literal('eventFilters'),
});
export type GetEndpointSuggestionsRequestParamsInput = z.input<
  typeof GetEndpointSuggestionsRequestParams
>;

export type GetEndpointSuggestionsRequestBody = z.infer<typeof GetEndpointSuggestionsRequestBody>;
export const GetEndpointSuggestionsRequestBody = z.object({
  field: z.string().optional(),
  query: z.string().optional(),
  filters: z.unknown(),
  fieldMeta: z.unknown(),
});
export type GetEndpointSuggestionsRequestBodyInput = z.input<
  typeof GetEndpointSuggestionsRequestBody
>;

export type GetEndpointSuggestionsResponse = z.infer<typeof GetEndpointSuggestionsResponse>;
export const GetEndpointSuggestionsResponse = SuccessResponse;
