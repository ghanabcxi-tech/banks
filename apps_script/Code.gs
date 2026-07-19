function doGet(e) {
  const view=String((e&&e.parameter&&e.parameter.view)||'survey').toLowerCase(); const file=view==='admin'?'Admin':'Index';
  return HtmlService.createTemplateFromFile(file).evaluate().setTitle(view==='admin'?'BCXI-Ghana Admin Portal':'BCXI-Ghana Customer Experience').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).addMetaTag('viewport','width=device-width, initial-scale=1, viewport-fit=cover');
}
function include(filename){return HtmlService.createHtmlOutputFromFile(filename).getContent();}
