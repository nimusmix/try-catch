/* eslint-disable no-param-reassign,consistent-return */
import React, { useState } from 'react';
import { Editor, rootCtx, themeManagerCtx } from '@milkdown/core';
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
import styled from 'styled-components';
import { prismPlugin } from '@milkdown/plugin-prism';
import { refractor } from 'refractor/lib/common';

const Wrapper = styled.div<{
  width?: string;
}>`
  width: ${({ width }) => width || '100%'};
  .milkdown-menu-wrapper {
    width: 100%;
    border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};

    .milkdown-menu,
    .menu-selector-list {
      background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
      border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};

      .button {
        background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
        border-radius: 4px;

        span {
          color: ${({ theme: { textColor } }) => textColor};
        }

        &:hover {
          background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-100)')};
          span {
            color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-500)')};
          }
        }
      }
    }

    .milkdown {
      background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#f7f8ff')};
      color: ${({ theme: { textColor } }) => textColor};
      box-shadow: none;

      .ProseMirror-selectednode {
        padding: 0.5rem;
        outline: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};
        border-radius: 0.5rem;
      }
    }
  }

  .milkdown-hdnsow.tooltip {
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
    border: none;

    .icon.active {
      color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-500)')};
    }

    span {
      color: ${({ theme: { textColor300 } }) => textColor300};
    }

    &:after {
      background: ${({ theme: { isDark } }) => (isDark ? '' : '#c7d4e8')};
    }
  }

  .menu-selector,
  .menu-selector-list {
    span,
    button {
      color: ${({ theme: { textColor } }) => textColor};
    }
  }

  .slash-dropdown,
  .milkdown-emoji-filter {
    min-height: 15rem;
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};

    .slash-dropdown-item span {
      color: ${({ theme: { textColor } }) => textColor};
    }
  }

  .code-fence_selector-list {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? '' : 'var(--colors-brand-200) !important;'};
    border: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
  }

  .code-fence_selector-list-item {
    color: ${({ theme: { textColor } }) => textColor};
  }

  .milkdown-emoji-filter {
    min-height: 8rem;
    max-height: 8rem;
  }

  .block-menu {
    background: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
    border: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};

    .block-menu-item span {
      color: ${({ theme: { textColor } }) => textColor};
    }
  }

  .empty-node:before {
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-white-300)' : 'var(--colors-black-300)'};
  }

  .milkdown-phvvv {
    color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-500)')};

    &:hover {
      background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
      color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-500)')};
    }
  }

  .milkdown .editor .code-fence pre {
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#f7f8ff')};
    color: ${({ theme: { textColor } }) => textColor};
  }
  .code-fence {
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#dae1f3')};

    .code-fence_selector {
      overflow: hidden;
      background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
      border: ${({ theme: { isDark } }) => (isDark ? '' : 'none')};

      .icon {
        border-left: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid rgb(131 163 195)')};
      }
      span,
      .icon {
        color: ${({ theme: { textColor } }) => textColor};
      }
      .icon:hover {
        color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-white-500)')};
        background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#96bdff')};
      }
    }

    blockquote {
      border-left: ${({ theme: { isDark } }) => (isDark ? '4px solid red' : '4px solid red')};
    }
  }
`;
const MilkdownEditor = ({ width }: { width: string }) => {
  const [output, setOutput] = useState('');

  const { editor } = useEditor(
    (root) =>
      Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
            setOutput(markdown);
          });
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
                        placeholder: '🤔 ...',
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

  return (
    <Wrapper width={width}>
      <ReactEditor editor={editor} />
    </Wrapper>
  );
};

export default MilkdownEditor;
