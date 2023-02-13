/*
 * TODO image 추가 부분 css 수정
 * */
import styled from 'styled-components';

const MilkDownWrapper = styled.div<{
  width?: string;
}>`
  width: ${({ width }) => width || '100%'};
  .milkdown-menu-wrapper {
    width: 100%;
    border: ${({ theme: { isDark } }) =>
      isDark ? '1px var(--colors-black-100) solid' : '1px solid var(--colors-brand-200)'};
    border-radius: var(--borders-radius-lg);

    .milkdown-menu {
      border-radius: 0.5rem 0.5rem 0 0;
    }

    .milkdown-menu,
    .menu-selector-list {
      background-color: ${({ theme: { isDark } }) =>
        isDark ? 'rgba(36, 42, 54, 1)' : 'var(--colors-brand-200)'};
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
      border-radius: 0 0 0.5rem 0.5rem;
      border-bottom: 1px solid
        ${({ theme: { isDark } }) =>
          isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)'};
      border-left: 1px solid
        ${({ theme: { isDark } }) =>
          isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)'};
      border-right: 1px solid
        ${({ theme: { isDark } }) =>
          isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)'};

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

  .slash-dropdown {
    min-height: 8rem;
    z-index: 1;
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
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#dae1f3')};
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

  .image-container {
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#dae1f3')} !important;
    & > span.placeholder:before {
      content: '이미지 추가';
      color: ${({ theme: { textColor } }) => textColor};
    }
  }

  .milkdown-benxqe.tooltip-input {
    background-color: ${({ theme: { isDark } }) => (isDark ? '' : '#dae1f3')} !important;

    input::placeholder {
      color: ${({ theme: { textColor } }) => textColor};
    }

    input button {
      color: ${({ theme: { textColor } }) => textColor};
    }
  }
`;

export default MilkDownWrapper;
