#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { C32Stack } from '../lib/c3-2-stack';

const app = new cdk.App();
new C32Stack(app, 'C32Stack');
