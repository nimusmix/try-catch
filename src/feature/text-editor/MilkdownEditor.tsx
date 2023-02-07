/* eslint-disable no-param-reassign,consistent-return */
import React, { ForwardedRef, forwardRef, useEffect } from 'react';
import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
  themeManagerCtx,
} from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import {
  createDropdownItem,
  defaultActions,
  slash,
  slashPlugin,
  WrappedAction,
} from '@milkdown/plugin-slash';
import { indent } from '@milkdown/plugin-indent';
import { block } from '@milkdown/plugin-block';
import { emoji } from '@milkdown/plugin-emoji';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { cursor } from '@milkdown/plugin-cursor';
import { tooltip } from '@milkdown/plugin-tooltip';
import { defaultConfig, menu, menuPlugin } from '@milkdown/plugin-menu';
import { gfm } from '@milkdown/preset-gfm';
import { prismPlugin } from '@milkdown/plugin-prism';
import { refractor } from 'refractor/lib/common';
import MilkDownWrapper from './MilkdownWrapper';

const MilkdownEditor = (
  {
    width,
    setState,
    editable = true,
    data = '',
  }: { width: string; setState?: (value: string) => void; editable?: boolean; data?: string },
  ref: ForwardedRef<any>
) => {
  const { editor, loading, getInstance } = useEditor(
    (root) =>
      Editor.make()
        .config((ctx) => {
          ctx.update(editorViewOptionsCtx, (prev) => ({
            ...prev,
            editable: () => editable as boolean,
          }));
          ctx.set(rootCtx, root);
          if (setState) {
            ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
              setState(markdown);
            });
          }
          if (data) {
            ctx.set(defaultValueCtx, data);
          }
        })
        .use(nord)
        .use(commonmark)
        .use(gfm)
        .use(history)
        .use(
          slash.configure(slashPlugin, {
            config: (ctx) => {
              return ({ content, isTopLevel }) => {
                if (!isTopLevel) return null;

                if (!content) {
                  return { placeholder: '명령어 사용 시 "/"를 입력하세요' };
                }

                const mapActions = (action: WrappedAction) => {
                  const { id = '' } = action;
                  switch (id) {
                    case 'h1':
                      action.dom = createDropdownItem(ctx.get(themeManagerCtx), '제목1', 'h1');
                      return action;
                    case 'h2':
                      action.dom = createDropdownItem(ctx.get(themeManagerCtx), '제목2', 'h2');
                      return action;
                    case 'h3':
                      action.dom = createDropdownItem(ctx.get(themeManagerCtx), '제목3', 'h3');
                      return action;
                    case 'bulletList':
                      action.dom = createDropdownItem(
                        ctx.get(themeManagerCtx),
                        '리스트',
                        'bulletList'
                      );
                      return action;
                    case 'orderedList':
                      action.dom = createDropdownItem(
                        ctx.get(themeManagerCtx),
                        '리스트(1)',
                        'orderedList'
                      );
                      return action;
                    case 'blockquote':
                      action.dom = createDropdownItem(ctx.get(themeManagerCtx), '인용', 'quote');
                      return action;
                    case 'code':
                      action.dom = createDropdownItem(ctx.get(themeManagerCtx), '코드블럭', 'code');
                      return action;
                    case 'divider':
                      action.dom = createDropdownItem(
                        ctx.get(themeManagerCtx),
                        '구분선',
                        'divider'
                      );
                      return action;
                    default:
                      return action;
                  }
                };

                if (content.startsWith('/')) {
                  return content === '/'
                    ? {
                        placeholder: '',
                        actions: defaultActions(ctx).map(mapActions),
                      }
                    : {
                        actions: defaultActions(ctx, content).map(mapActions),
                      };
                }
              };
            },
          })
        )
        .use(indent)
        .use(block)
        .use(emoji)
        .use(cursor)
        .use(tooltip)
        .use(
          prismPlugin({
            configureRefractor: () => refractor,
          })
        )
        .use(
          menu.configure(menuPlugin, {
            config: defaultConfig.map((section) => {
              return section.map((item) => {
                if (item.type !== 'select') {
                  return item;
                }
                switch (item.text) {
                  case 'Heading': {
                    return {
                      ...item,
                      text: '제목/본문',
                      options: [
                        { id: '1', text: '제목1' },
                        { id: '2', text: '제목2' },
                        { id: '3', text: '제목3' },
                        { id: '0', text: '본문' },
                      ],
                    };
                  }
                  default:
                    return item;
                }
              });
            }),
          })
        )
        .use(listener),
    []
  );

  useEffect(() => {
    if (!loading) {
      console.log('data', `${data}`);
      const instance = getInstance();
      instance?.action((ctx) => {
        // eslint-disable-next-line no-console
        ctx.update(defaultValueCtx, (prev) => prev);
      });
    }
  }, [data, getInstance, loading]);

  return (
    <MilkDownWrapper width={width} ref={ref}>
      <ReactEditor editor={editor} />
    </MilkDownWrapper>
  );
};

export default forwardRef(MilkdownEditor);
