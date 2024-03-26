/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Type } from '@kbn/config-schema';
import type { UiCounterMetricType } from '@kbn/analytics';

/**
 * UI element type to represent the settings.
 * @public
 * */
export type UiSettingsType =
  | 'undefined' // I don't know why malformed UiSettings objects exist
  | 'json'
  | 'markdown'
  | 'number'
  | 'select'
  | 'boolean'
  | 'string'
  | 'array'
  | 'image'
  | 'color';

/**
 * Type for the readonly mode of the readonly settings.
 * 'strict' indicates that the value cannot be changed through API and is not displayed in the UI
 * 'ui' indicates that the value is just not displayed in the UI
 * @public
 * */
export type ReadonlyModeType = 'strict' | 'ui';

/**
 * UiSettings deprecation field options.
 * @public
 * */
export interface DeprecationSettings {
  /** Deprecation message */
  message: string;
  /** Key to documentation links */
  docLinksKey: string;
}

/**
 * UiSettings parameters defined by the plugins.
 * @public
 * */
export interface UiSettingsParams<T = unknown> {
  /** title in the UI */
  name?: string;
  /** default value to fall back to if a user doesn't provide any */
  value?: T;
  /** description provided to a user in UI */
  description?: string;
  /** used to group the configured setting in the UI */
  category?: string[];
  /** array of permitted values for this setting */
  options?: string[] | number[];
  /** text labels for 'select' type UI element */
  optionLabels?: Record<string, string>;
  /** a flag indicating whether new value applying requires page reloading */
  requiresPageReload?: boolean;
  /** a flag indicating that value cannot be changed */
  readonly?: boolean;
  /** a flag indicating the level of restriction of the readonly settings {@link ReadonlyModeType} */
  readonlyMode?: ReadonlyModeType;
  /**
   * a flag indicating that value might contain user sensitive data.
   * used by telemetry to mask the value of the setting when sent.
   */
  sensitive?: boolean;
  /** defines a type of UI element {@link UiSettingsType} */
  type?: UiSettingsType;
  /** optional deprecation information. Used to generate a deprecation warning. */
  deprecation?: DeprecationSettings;
  /**
   * index of the settings within its category (ascending order, smallest will be displayed first).
   * Used for ordering in the UI.
   *
   * @remark settings without order defined will be displayed last and ordered by name
   */
  order?: number;
  /**
   * Value validation schema.
   * Used to validate value on write and read.
   *
   * This schema is also used for validating the user input in all settings fields {@link FieldRow} across Kibana UI.
   * Use schema options to specify limits on the value. For example:
   * `schema.number({ min: 0, max: 100 })`
   *
   * More information about schema in https://github.com/elastic/kibana/blob/main/packages/kbn-config-schema/README.md
   */
  schema: Type<T>;
  /**
   * Metric to track once this property changes
   * @deprecated
   * Temporary measure until https://github.com/elastic/kibana/issues/83084 is in place
   */
  metric?: {
    type: UiCounterMetricType;
    name: string;
  };
  /**
   * Scope of the setting. `Global` denotes a setting globally available across namespaces. `Namespace` denotes a setting
   * scoped to a namespace. The default value is 'namespace'
   */
  scope?: UiSettingsScope;
}

/**
 * Describes the values explicitly set by user.
 * @public
 * */
export interface UserProvidedValues<T = any> {
  userValue?: T;
  isOverridden?: boolean;
}

/**
 * Denotes the scope of the setting
 */
export type UiSettingsScope = 'namespace' | 'global';
