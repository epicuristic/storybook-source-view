import React, { useEffect, useState } from 'react'
import { useParameter } from '@storybook/manager-api';
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const toArray = (variable) => (variable == null || Array.isArray(variable))? variable : [variable]

const isEmpty = (array) => array == null || array.length === 0

const SourceCodePanel = () => {
  const [remoteCode, setRemoteCode] = useState([])
  const {url, code, language} = useParameter('componentSource', {url: [], code: []})
  useEffect(() => {
    if (!isEmpty(url)) {
      const urls = toArray(url)
      const promises = []
      for (const currentURL of urls) {
        promises.push(axios.get(currentURL).then(response => response.data))
      }
      Promise.all(promises).then((codes) => setRemoteCode(codes))

    } else {
      setRemoteCode([])
    }
    return () => setRemoteCode([])
  }, [JSON.stringify(url)])
  const localCodeAsArray = toArray(code)
  const codeSnippets = (!isEmpty(localCodeAsArray))
    ? localCodeAsArray
    : (!isEmpty(remoteCode))
      ? remoteCode
      : null
  return (
    <>
      {(codeSnippets != null) ? (codeSnippets).map((currentSnippet, index) => (
          <SyntaxHighlighter key={index} language={language} style={docco}>{currentSnippet}</SyntaxHighlighter>
        ))
        : (!isEmpty(url)) ? `fetching ${toArray(url).join('\n')}...`
          : "No URL provided, to add the source code to this panel, add a componentSource parameter to your story."}
    </>
  )
}

export default SourceCodePanel
