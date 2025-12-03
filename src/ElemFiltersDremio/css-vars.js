export const cssVars = {
    'wrapper_margin-left': ({ hasMarginLeft, marginBetweenButtons, marginBetweenButtonsUnit }) =>
        hasMarginLeft ? `${marginBetweenButtons}${marginBetweenButtonsUnit}` : 0,
    'switch_margin-right': 'switchBtnMarginRight',
    'hovered-bg-color': 'hoverColor',
    'button-hover-color': 'buttonHoverColor'
};
