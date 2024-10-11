# Storybook source view addon

## What is it?

This is an upgraded version of the [original Storybook-source-code-addon by Gauthier Fiorentino](https://gitlab.com/Mintoo200/storybooksourcecodeaddon) for [Storybook](https://storybook.js.org/). It allows anyone navigating your Storybook to access the source code of your components. This addon provides an alternative to traditional libraries by enabling users to directly copy and paste your code instead of using it as a library.

## How do I install it?

The installation is straightforward:

- First, install the dependency:
```sh
$ npm i -D @epicuristic/storybook-source-view
```
- Then add it to your `.storybook/main.js`
```js
module.exports = {
  addons: ['@epicuristic/storybook-source-view']
}
```

## Getting Started

### Using a string

If your source code is stored as a string, add it to your story like this:
```js
export default {
  title: 'Your story',
  parameters: {
    componentSource: {
      code: 'export default "This is my code"',
      language: 'javascript',
    }
  },
};
```
For better organization, you can store the code in a separate file:
```js
// MyComponent.code.js
export default `
const MyComponent = () => "Hello World"
`
```
```js
import MyComponentCode from './MyComponent.code'

export default {
  title: 'Your story',
  parameters: {
    componentSource: {
      code: MyComponentCode,
      language: 'javascript',
    }
  },
};
```

### Using a URL

If your repository is publicly accessible, you can provide a URL to the addon:
```js
export default {
  title: 'Your story',
  parameters: {
    componentSource: {
      url: 'https://path.to.your.repository/file%2Etsx',
      language: 'javascript',
    }
  },
};
```
Common API patterns for repositories include:
- GitLab: `https://gitlab.com/api/v4/projects/<ProjectID>/repository/files/<file path URL encoded>/raw?ref=master`

### Multiple files

To expose multiple files, you can use an array of URLs:
```js
export default {
  title: 'Your story',
  parameters: {
    componentSource: {
      url: [
        'https://path.to.your.repository/file%2Etsx',
        'https://path.to.your.repository/file2%2Etsx',        
      ],
      language: 'javascript',
    }
  },
};
```
Alternatively, if you prefer using code strings:
```js
export default {
  title: 'Your story',
  parameters: {
    componentSource: {
      code: [
        'export default "This is my code"',
        'export default "This is also my code"',
      ],
      language: 'javascript',
    }
  },
};
```

