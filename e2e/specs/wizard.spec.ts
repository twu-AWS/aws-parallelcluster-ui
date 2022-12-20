// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
// with the License. A copy of the License is located at
//
// http://aws.amazon.com/apache2.0/
//
// or in the "LICENSE.txt" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
// OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and
// limitations under the License.

import { expect, test } from '@playwright/test';
import { visitAndLogin } from '../test-utils/login';

test.describe('Given an endpoint where ParallelCluster Manager is deployed', () => {
  test('a user should be able to login, navigate till the end of the cluster creation wizard, and perform a dry-run successfully', async ({ page }) => {
    await visitAndLogin(page)
  
    await page.getByRole('button', { name: 'Create Cluster' }).first().click();
    await expect(page.getByRole('heading', { name: 'Cluster Name' })).toBeVisible()
    await page.getByRole('textbox', { name: 'Enter your cluster name' }).fill("testcluster");
    await page.getByRole('button', { name: 'Next' }).click();
    
    await expect(page.getByRole('heading', { name: 'Cluster Properties' })).toBeVisible()
    await page.getByRole('button', { name: 'Select a VPC' }).click();
    await page.getByText(/vpc-.*/).first().click();
    await page.getByRole('button', { name: 'Next' }).click();
    
    await expect(page.getByRole('heading', { name: 'Head Node Properties' })).toBeVisible()
    await page.getByRole('button', { name: 'Next' }).click();
  
    await expect(page.getByRole('heading', { name: 'Storage Properties' })).toBeVisible()
    await page.getByRole('button', { name: 'Next' }).click();
  
    await expect(page.getByRole('heading', { name: 'Queues' })).toBeVisible()
    await page.getByRole('button', { name: 'Next' }).click();
  
    await expect(page.getByRole('heading', { name: 'Cluster Configuration' })).toBeVisible()
    await page.getByRole('button', { name: 'Dry Run' }).click();
  
    await expect(page.getByText('Request would have succeeded, but DryRun flag is set.')).toBeVisible()
  });
})