import Typography from "typography";
import fairyGateTheme from "typography-theme-lawton";

fairyGateTheme.headerFontFamily = fairyGateTheme.bodyFontFamily;
fairyGateTheme.baseLineHeight = 1.75;
fairyGateTheme.headerColor = '#404040';
fairyGateTheme.bodyColor = '#404040';

const typography = new Typography(fairyGateTheme);
export const { options } = typography;

export default typography;
