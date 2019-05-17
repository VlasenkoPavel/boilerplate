module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test.ts|spec.js))$',
    testURL: "http://localhost/",
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleNameMapper: {
        '^@bin/(.*)': '<rootDir>/dist/bin/$1',
        '^@application/(.*)': '<rootDir>/dist/main/application/$1',
        '^@core/(.*)': '<rootDir>/dist/main/core/$1',
        '^@domain/(.*)': '<rootDir>/dist/main/domain/$1',
        '^@use-cases/(.*)': '<rootDir>/dist/main/use-cases/$1',
        "^@infrastructure/(.*)$": '<rootDir>/dist/main/infrastructure/$1',
        '^@main/(.*)': '<rootDir>/dist/main/$1',
        '^@utils/(.*)': '<rootDir>/dist/main/utils/$1',
        '^@test/(.*)': '<rootDir>/dist/test/$1'
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ]
 }
