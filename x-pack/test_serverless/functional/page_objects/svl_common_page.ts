/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../ftr_provider_context';

export function SvlCommonPageProvider({ getService, getPageObjects }: FtrProviderContext) {
  const testSubjects = getService('testSubjects');
  const config = getService('config');
  const pageObjects = getPageObjects(['security', 'common']);
  const retry = getService('retry');
  const deployment = getService('deployment');
  const log = getService('log');
  const browser = getService('browser');
  const svlUserManager = getService('svlUserManager');

  const delay = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  return {
    async loginWithRole(role: string) {
      log.debug(`Logging by setting browser cookie for '${role}' role`);
      const session = await svlUserManager.getSessionByRole(role);
      // Loading bootstrap.js in order to be on the domain that the cookie will be set for.
      await browser.get(deployment.getHostPort() + '/bootstrap.js');
      await browser.setCookie('sid', session.getCookieValue());
      // Navigating to project home page
      await browser.get(deployment.getHostPort());
      // ensure welcome screen won't be shown. This is relevant for environments which don't allow
      // to use the yml setting, e.g. cloud
      await browser.setLocalStorageItem('home:welcome:show', 'false');
      if (await testSubjects.exists('userMenuButton', { timeout: 10_000 })) {
        log.debug('userMenuButton is found, logged in passed');
      } else {
        throw new Error(`Failed to login with cookie for '${role}' role`);
      }
    },

    async navigateToLoginForm() {
      const url = deployment.getHostPort() + '/login';
      await browser.get(url);
      // ensure welcome screen won't be shown. This is relevant for environments which don't allow
      // to use the yml setting, e.g. cloud
      await browser.setLocalStorageItem('home:welcome:show', 'false');

      log.debug('Waiting for Login Form to appear.');
      await retry.waitForWithTimeout('login form', 10_000, async () => {
        return await pageObjects.security.isLoginFormVisible();
      });
    },

    async login() {
      await pageObjects.security.forceLogout({ waitForLoginPage: false });

      // adding sleep to settle down logout
      await pageObjects.common.sleep(2500);

      await retry.waitForWithTimeout(
        'Waiting for successful authentication',
        90_000,
        async () => {
          if (!(await testSubjects.exists('loginUsername', { timeout: 1000 }))) {
            await this.navigateToLoginForm();

            await testSubjects.setValue('loginUsername', config.get('servers.kibana.username'));
            await testSubjects.setValue('loginPassword', config.get('servers.kibana.password'));
            await testSubjects.click('loginSubmit');
          }

          if (await testSubjects.exists('userMenuButton', { timeout: 10_000 })) {
            log.debug('userMenuButton is found, logged in passed');
            return true;
          } else {
            throw new Error(`Failed to login to Kibana via UI`);
          }
        },
        async () => {
          // Sometimes authentication fails and user is redirected to Cloud login page
          // [plugins.security.authentication] Authentication attempt failed: UNEXPECTED_SESSION_ERROR
          const currentUrl = await browser.getCurrentUrl();
          if (currentUrl.startsWith('https://cloud.elastic.co')) {
            log.debug(
              'Probably authentication attempt failed, we are at Cloud login page. Retrying from scratch'
            );
          } else {
            const authError = await testSubjects.exists('promptPage', { timeout: 2500 });
            if (authError) {
              log.debug('Probably SAML callback page, doing logout again');
              await pageObjects.security.forceLogout({ waitForLoginPage: false });
            } else {
              const isOnLoginPage = await testSubjects.exists('loginUsername', { timeout: 1000 });
              if (isOnLoginPage) {
                log.debug(
                  'Probably ES user profile activation failed, waiting 2 seconds and pressing Login button again'
                );
                await delay(2000);
                await testSubjects.click('loginSubmit');
              } else {
                log.debug('New behaviour, trying to navigate and login again');
              }
            }
          }
        }
      );
      log.debug('Logged in successfully');
    },

    async forceLogout() {
      await pageObjects.security.forceLogout({ waitForLoginPage: false });
      log.debug('Logged out successfully');
    },

    async assertProjectHeaderExists() {
      await testSubjects.existOrFail('kibanaProjectHeader');
    },

    async clickUserAvatar() {
      testSubjects.click('userMenuAvatar');
    },

    async assertUserAvatarExists() {
      await testSubjects.existOrFail('userMenuAvatar');
    },

    async assertUserMenuExists() {
      await testSubjects.existOrFail('userMenu');
    },
  };
}
