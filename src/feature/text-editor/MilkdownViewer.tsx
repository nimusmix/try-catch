/* eslint-disable no-param-reassign,consistent-return */
import React from 'react';
import { defaultValueCtx, Editor, editorViewOptionsCtx, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { indent } from '@milkdown/plugin-indent';
import { emoji } from '@milkdown/plugin-emoji';
import { gfm } from '@milkdown/preset-gfm';
import { prismPlugin } from '@milkdown/plugin-prism';
import { refractor } from 'refractor/lib/common';
import MilkDownWrapper from './MilkdownWrapper';

const MilkdownViewer = ({ width, data = '' }: { width: string; data: string }) => {
  const { editor } = useEditor(
    (root) =>
      Editor.make()
        .config((ctx) => {
          ctx.update(editorViewOptionsCtx, (prev) => ({
            ...prev,
            editable: () => false,
          }));
          ctx.set(rootCtx, root);
          if (data) {
            ctx.set(defaultValueCtx, data);
          }
        })
        .use(nord)
        .use(commonmark)
        .use(gfm)
        .use(indent)
        .use(emoji)
        .use(
          prismPlugin({
            configureRefractor: () => refractor,
          })
        ),
    []
  );

  return (
    <MilkDownWrapper width={width}>
      <ReactEditor editor={editor} />
    </MilkDownWrapper>
  );
};

export default MilkdownViewer;
