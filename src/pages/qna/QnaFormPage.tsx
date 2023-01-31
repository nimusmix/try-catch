import styled from 'styled-components';
import React from 'react';
import Layout from '../../layout/Layout';
import MilkdownEditor from '../../feature/text-editor/MilkdownEditor';

const Section = styled.section`
  width: 100%;
  max-width: var(--breakpoints-desktop);

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
  .code-fence_selector-list {
    min-height: 15rem;
    background: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};
    border: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-200)')};

    .slash-dropdown-item span,
    .code-fence_selector-list-item {
      color: ${({ theme: { textColor } }) => textColor};
    }
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
const QnaFormPage = () => {
  return (
    <Layout>
      <Section>
        <MilkdownEditor />
      </Section>
    </Layout>
  );
};

export default QnaFormPage;
