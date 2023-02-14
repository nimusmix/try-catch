import styled from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import { IBadge } from '../../../interface/user';

const Badge = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${({ theme: { isDark } }) =>
    isDark ? 'var(--shadows-brand-lg)' : 'var(--shadows-black-lg)'};
`;

const ToolTip = styled.div`
  &.tooltip {
    position: relative;
    display: inline-block;
  }

  &.tooltip .tooltip-content {
    position: absolute;
    visibility: hidden;
    border-radius: var(--borders-radius-base);
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-300)' : 'var(--colors-brand-100)'};
    box-shadow: 0 3px 8px rgba(165, 165, 165, 0.5);
    margin-top: 10px;
    padding: 1.25rem 1.5rem;

    width: 240px;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  &.tooltip:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }
`;

const BadgeListItem = ({ title, content, imgSrc }: Partial<IBadge>) => {
  return (
    <ToolTip className="tooltip">
      <Badge src={imgSrc} />
      <div className="tooltip-content">
        <Paragraph sizeType="lg" fontWeight="600" margin="0 0 4px 0">
          {title} ✨
        </Paragraph>
        <Paragraph sizeType="base">{content}</Paragraph>
      </div>
    </ToolTip>
  );
};

export default BadgeListItem;
