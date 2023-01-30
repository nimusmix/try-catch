import React, { useState } from 'react';
import { Editor, rootCtx, editorViewOptionsCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import { slash } from '@milkdown/plugin-slash';
import { indent } from '@milkdown/plugin-indent';
import { block } from '@milkdown/plugin-block';
import { emoji } from '@milkdown/plugin-emoji';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import ReactMarkdown from 'react-markdown';

const MilkdownEditor = () => {
  const [output, setOutput] = useState('');

  const editable = () => true;

  const { editor } = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          setOutput(markdown);
        });
        ctx.update(editorViewOptionsCtx, (prev) => ({ ...prev, editable }));
      })
      .use(nord)
      .use(commonmark)
      .use(history)
      .use(slash)
      .use(indent)
      .use(block)
      .use(emoji)
      .use(listener)
  );

  return (
    <>
      <ReactEditor editor={editor} />
      <div className="result-test">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>
    </>
  );
};

export default MilkdownEditor;
