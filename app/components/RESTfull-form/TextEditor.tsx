import { EditorState } from 'lexical';
import { useEffect, useState } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

const theme = {};

function onError(error: Error) {
  console.error(error);
}

interface MyOnChangePluginProps {
  onChange: (editorState: EditorState) => void;
}

const MyOnChangePlugin: React.FC<MyOnChangePluginProps> = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
};

export default function Editor() {
  const [textContent, setTextContent] = useState<string>('');

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  function onChange(editorState: EditorState) {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      setTextContent(text);
      console.log(textContent);
    });
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <MyOnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
