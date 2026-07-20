function getQuestionnaireSeed_() {
  const scale7 = ['1','2','3','4','5','6','7'];
  const sections = [
    {id:'S1',order:1,title:'CX Foundations and Journey Experience',subtitle:'What is Customer Experience?',imageKey:'CX_SECTION_JOURNEY',items:[
      ['S1.1','My overall experience with this bank is shaped positively by the different interactions I have with it.'],
      ['S1.2','The bank provides a good experience across the full banking relationship, rather than only when I speak to a customer service employee.'],
      ['S1.3','My experiences with the bank are positive from the point of seeking information through account opening, regular account use and problem resolution.'],
      ['S1.4','The bank manages its different customer touchpoints, including branches, ATMs, digital platforms, telephone services and communications, effectively.'],
      ['S1.5','My interactions with the bank generally leave me with positive feelings about the institution.'],
      ['S1.6','The experience delivered by the bank is consistent with the expectations created by its advertising and brand promises.'],
      ['S1.7','The bank has successfully integrated digital banking into the overall customer experience it provides.']
    ]},
    {id:'S2',order:2,title:'Strategic Customer Experience Delivery',subtitle:'CX as Competitive Strategy',imageKey:'CX_SECTION_STRATEGY',items:[
      ['S2.1','My bank appears to treat customer experience as an important part of its overall business strategy.'],
      ['S2.2','The experience delivered by my bank distinguishes it positively from competing banks.'],
      ['S2.3','My bank provides services and experiences that are relevant to the needs of customers like me.'],
      ['S2.4','The quality of experience provided by my bank makes me willing to continue banking with it.'],
      ['S2.5','The experience I receive is consistent with the promises and positioning of the bank’s brand.'],
      ['S2.6','My bank appears committed to improving customer experience over the long term rather than through occasional campaigns.'],
      ['S2.7','Senior leaders of the bank appear genuinely committed to the quality of experience customers receive.']
    ]},
    {id:'S3',order:3,title:'Banking Experience Differentiation',subtitle:'Why CX Has Become the Ultimate Differentiator',imageKey:'CX_SECTION_DIFFERENTIATION',items:[
      ['S3.1','The experience provided by my bank gives me a strong reason to choose it over banks offering similar products and prices.'],
      ['S3.2','I trust my bank to act honestly and responsibly in its dealings with customers.'],
      ['S3.3','My bank delivers a consistently good experience across different occasions and service channels.'],
      ['S3.4','My bank completes transactions and responds to customer needs with appropriate speed.'],
      ['S3.5','The bank makes reasonable efforts to personalise its services and communications to my needs.'],
      ['S3.6','Employees of the bank generally appear motivated and prepared to deliver a good customer experience.'],
      ['S3.7','My bank uses technology and artificial intelligence in ways that improve rather than complicate the customer experience.']
    ]},
    {id:'S4',order:4,title:'Banking Service Innovation',subtitle:'Service Innovation in Highly Competitive Industries',imageKey:'CX_SECTION_INNOVATION',items:[
      ['S4.1','My bank regularly introduces meaningful improvements to the way customers receive banking services.'],
      ['S4.2','The bank improves services in response to difficulties and frustrations experienced by customers.'],
      ['S4.3','New banking services introduced by my bank are generally easy to understand and use.'],
      ['S4.4','My bank provides a well-integrated experience across branches, mobile banking, internet banking, USSD, ATMs and other channels.'],
      ['S4.5','Technology is used to improve service while human assistance remains available when customers need it.'],
      ['S4.6','My bank provides customers with meaningful opportunities to offer suggestions about new or improved services.'],
      ['S4.7','The bank anticipates emerging customer needs rather than waiting until problems become widespread.']
    ]},
    {id:'S5',order:5,title:'Customer Psychology and Experience Evaluation',subtitle:'Understanding the Psychology of Customer Behaviour',imageKey:'CX_SECTION_PSYCHOLOGY',items:[
      ['S5.1','My bank understands what customers expect from contemporary banking services.'],
      ['S5.2','Important moments in my relationship with the bank, such as account opening or problem resolution, are handled in a positive and memorable manner.'],
      ['S5.3','The bank makes its products, procedures and communications easy for customers to understand.'],
      ['S5.4','Completing routine banking activities with this bank requires little unnecessary effort.'],
      ['S5.5','I am treated fairly when the bank applies fees, policies, procedures and service conditions.'],
      ['S5.6','The way the bank handles customer concerns demonstrates an understanding of customers’ emotions and frustrations.'],
      ['S5.7','My experiences with the bank have strengthened my trust in the institution over time.']
    ]},
    {id:'S6',order:6,title:'Long-Term Banking Relationship Quality',subtitle:'Building Long-Term Customer Relationships',imageKey:'CX_SECTION_RELATIONSHIP',items:[
      ['S6.1','My bank appears interested in building a long-term relationship with me rather than merely completing individual transactions.'],
      ['S6.2','The bank demonstrates a genuine understanding of my banking needs and circumstances.'],
      ['S6.3','The services and communications I receive are reasonably personalised to my needs.'],
      ['S6.4','The bank contacts me proactively when there is information or assistance that may be useful to me.'],
      ['S6.5','My bank recognises important stages or changes in my relationship with it and responds appropriately.'],
      ['S6.6','I trust the bank to use my personal and transactional information ethically.'],
      ['S6.7','My bank consistently provides enough value to justify maintaining a long-term relationship with it.']
    ]},
    {id:'S7',order:7,title:'Complaint Handling and Service Recovery',subtitle:'Turning Dissatisfied Customers into Brand Advocates',imageKey:'CX_SECTION_RECOVERY',note:'If you have not experienced a service failure or submitted a complaint during the past twelve months, select N/A where you cannot evaluate the statement.',items:[
      ['S7.1','It is easy to report a service problem or submit a complaint to my bank.'],
      ['S7.2','My bank responds to complaints and service failures promptly.'],
      ['S7.3','Employees listen empathetically when customers describe problems or frustrations.'],
      ['S7.4','Employees are sufficiently empowered to resolve common customer problems without unnecessary escalation.'],
      ['S7.5','The solutions offered when service failures occur are fair and appropriate.'],
      ['S7.6','The bank keeps customers informed and follows up after resolving significant complaints.'],
      ['S7.7','The way my bank handles problems can restore or strengthen a customer’s confidence in the institution.']
    ]},
    {id:'S8',order:8,title:'Service Excellence Culture',subtitle:'Embedding Service Excellence into Organisational Culture',imageKey:'CX_SECTION_CULTURE',items:[
      ['S8.1','Employees throughout the bank behave as though customer experience is an important organisational value.'],
      ['S8.2','Managers and supervisors become involved when necessary to ensure that customers receive appropriate assistance.'],
      ['S8.3','Employees appear to have received adequate training to serve customers competently and professionally.'],
      ['S8.4','Employees are willing to take responsibility rather than blaming other departments for customer problems.'],
      ['S8.5','The bank’s service standards are applied consistently by different employees and branches.'],
      ['S8.6','Different departments of the bank cooperate effectively when addressing customer needs.'],
      ['S8.7','Customer feedback appears to influence the decisions and behaviour of the bank.']
    ]},
    {id:'S9',order:9,title:'CX Measurement and Continuous Improvement',subtitle:'Measuring and Maintaining Service Excellence Across Departments',imageKey:'CX_SECTION_MEASUREMENT',items:[
      ['S9.1','My bank regularly provides customers with opportunities to evaluate their experiences.'],
      ['S9.2','The bank seeks feedback about specific interactions, such as branch visits, digital transactions and complaint resolution.'],
      ['S9.3','My bank asks customers about the effort required to obtain services or complete transactions.'],
      ['S9.4','I have seen evidence that the bank makes improvements in response to customer feedback.'],
      ['S9.5','Problems that affect customers across different departments or channels appear to be investigated and corrected.'],
      ['S9.6','The bank appears to monitor whether its services are maintaining acceptable standards over time.'],
      ['S9.7','My bank communicates important service improvements or corrective actions to customers.']
    ]},
    {id:'S10',order:10,title:'Internal Enablement of External Customer Experience',subtitle:'Managing Internal Customer Experience',imageKey:'CX_SECTION_INTERNAL',items:[
      ['S10.1','Employees appear to have access to the information they need to serve customers effectively.'],
      ['S10.2','The bank’s internal technology systems enable employees to complete customer requests efficiently.'],
      ['S10.3','Information provided by one department is generally consistent with information provided by another.'],
      ['S10.4','Customers are not repeatedly asked to provide information that the bank should already possess.'],
      ['S10.5','My requests move smoothly between employees, departments and service channels when necessary.'],
      ['S10.6','Internal administrative difficulties are not used as excuses for poor service delivery.'],
      ['S10.7','The way employees work together internally results in a coherent and dependable customer experience.']
    ]}
  ];
  const outcomes = [
    {id:'OUT_CX',title:'Overall Customer Experience',items:[['O1','Overall, my experiences with this bank have been positive.'],['O2','Taken together, this bank provides an excellent customer experience.']]},
    {id:'OUT_SAT',title:'Customer Satisfaction',items:[['O3','Overall, I am satisfied with this bank.'],['O4','The bank generally meets my expectations.']]},
    {id:'OUT_LOY',title:'Customer Loyalty',items:[['O5','I intend to continue using this bank as my main bank.'],['O6','I would consider obtaining additional products or services from this bank.']]},
    {id:'OUT_ADV',title:'Advocacy',items:[['O7','I would recommend this bank to friends, relatives or colleagues.'],['O8','I would say positive things about this bank to other people.']]},
    {id:'OUT_SWITCH',title:'Switching Intention',items:[['O9','I frequently consider moving my main banking relationship to another bank.'],['O10','I am likely to reduce my use of this bank during the next twelve months.']]}
  ];
  return {scale7,sections,outcomes};
}

function getQuestionRows_() {
  const seed=getQuestionnaireSeed_(); const rows=[];
  rows.push(['TENURE','CONTEXT',0,1,'SELECT','How long have you banked with this institution?',true,false,'',false,safeJson_(['Less than 1 year','1–3 years','4–6 years','7–10 years','More than 10 years']),'CX_TOUCHPOINT_BRANCH',true]);
  rows.push(['BRANCH_FREQ','CONTEXT',0,2,'SELECT','How often do you visit a physical branch?',true,false,'',false,safeJson_(['Daily','Weekly','Monthly','Occasionally','Never']),'CX_TOUCHPOINT_BRANCH',true]);
  rows.push(['CHANNELS','CONTEXT',0,3,'MULTISELECT','Which banking channels do you use?',true,false,'',false,safeJson_(['Branch','ATM','Mobile App','Internet Banking','WhatsApp Banking','USSD','Call Centre','Relationship Manager']),'CX_SECTION_JOURNEY',true]);
  seed.sections.forEach(sec=>sec.items.forEach((it,idx)=>rows.push([it[0],sec.id,sec.order,idx+1,'LIKERT7',it[1],true,true,sec.id,false,safeJson_(seed.scale7),sec.imageKey,true])));
  seed.outcomes.forEach((g,gidx)=>g.items.forEach((it,idx)=>rows.push([it[0],g.id,20+gidx,idx+1,'LIKERT7',it[1],true,false,g.id,false,safeJson_(seed.scale7),'CX_SECTION_OUTCOMES',true])));
  rows.push(['NPS','NPS',30,1,'SCALE10','How likely are you to recommend this bank to a friend, relative or colleague?',true,false,'NPS',false,safeJson_(['0','1','2','3','4','5','6','7','8','9','10']),'CX_SECTION_NPS',true]);
  rows.push(['OVERALL','OVERALL',31,1,'SCALE10','Using a scale from 0 to 10, where 0 means extremely poor and 10 means exceptional, how would you rate your overall experience with this bank?',true,false,'OVERALL',false,safeJson_(['0','1','2','3','4','5','6','7','8','9','10']),'CX_SECTION_OVERALL',true]);
  return rows;
}
