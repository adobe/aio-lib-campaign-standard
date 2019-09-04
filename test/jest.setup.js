/*
Copyright 2019 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { stdout } = require('stdout-stderr')
const fs = require.requireActual('fs')
const eol = require('eol')

const fetch = require('jest-fetch-mock')
jest.setMock('node-fetch', fetch)

jest.setTimeout(30000)
jest.useFakeTimers()

// dont touch the real fs
jest.mock('fs', () => require('jest-plugin-fs/mock'))

// ensure a mocked openwhisk module for unit-tests
jest.mock('swagger-client')

// trap console log
beforeEach(() => { stdout.start() })
afterEach(() => { stdout.stop() })

// helper for fixtures
global.fixtureFile = (output) => {
  return fs.readFileSync(`./test/__fixtures__/${output}`).toString()
}

// helper for fixtures
global.fixtureJson = (output) => {
  return JSON.parse(fs.readFileSync(`./test/__fixtures__/${output}`).toString())
}

// set the fake filesystem
const ffs = require('jest-plugin-fs').default
global.fakeFileSystem = {
  addJson: (json) => {
    // add to existing
    ffs.mock(json)
  },
  removeKeys: (arr) => {
    // remove from existing
    const files = ffs.files()
    for (const prop in files) {
      if (arr.includes(prop)) {
        delete files[prop]
      }
    }
    ffs.restore()
    ffs.mock(files)
  },
  clear: () => {
    // reset to empty
    ffs.restore()
  },
  reset: ({ emptyWskProps = false } = {}) => {
    // reset to file system with wskprops
    ffs.restore()
    // ffs.mock(json)
  },
  files: () => {
    return ffs.files()
  }
}
// seed the fake filesystem
fakeFileSystem.reset()

// fixture matcher
expect.extend({
  toMatchFixture (received, argument) {
    const val = fixtureFile(argument)
    expect(eol.auto(received)).toEqual(eol.auto(val))
    return { pass: true }
  }
})

expect.extend({
  toMatchFixtureJson (received, argument) {
    const val = fixtureJson(argument)
    expect(received).toEqual(val)
    return { pass: true }
  }
})
