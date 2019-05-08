#!/usr/bin/env node
import '../bootstrap';
import { runScript } from '@main/utils/runScript';
import { TestDataLoader } from '@test/common/TestDataLoader';

runScript(new TestDataLoader());
