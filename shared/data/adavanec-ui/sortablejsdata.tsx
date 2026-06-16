interface dataType {
  id: number;
  name: string;
}
interface dataType1 {
  id: number;
  name: string;
  filter: string;
}

export const Drag: dataType[] = [
  { id: 1, name: "1. Design logo for fictional company" },
  { id: 2, name: "2. Draft 300-word blog post" },
  { id: 3, name: "3. Create project plan with milestones" },
  { id: 4, name: "4. Develop sample interview questions" },
  { id: 5, name: "5. Generate customer feedback for product." },
  { id: 6, name: "6. Write email template for newsletter." },
];
export const Drag1: dataType[] = [
  { id: 1, name: "1.Sketch a website homepage" },
  { id: 2, name: "2.Plan team-building activity." },
  { id: 3, name: "3.Summarize meeting minutes." },
  { id: 4, name: "4.Code a simple webpage." },
  { id: 5, name: "5.Create survey questions." },
  { id: 6, name: "6.Schedule team meeting." },
];
export const Drag2: dataType[] = [
  { id: 11, name: "1.Edit product description" },
  { id: 12, name: "2.Brainstorm marketing ideas." },
  { id: 13, name: "3.Write slogan for brand." },
  { id: 14, name: "4.Update contact information." },
  { id: 15, name: "5.Proofread blog post." },
  { id: 16, name: "6.Analyze sales data." },
];
export const Drag3: dataType[] = [
  { id: 1, name: "Brainstorm blog topics." },
  { id: 2, name: "Draft press release." },
  { id: 3, name: "Update employee handbook." },
  { id: 4, name: "Design event tickets." },
  { id: 5, name: "Summarize research findings." },
  { id: 6, name: "Plan office layout." },
];
export const Drag4: dataType1[] = [
  { id: 11, name: "Analyze market trends.", filter: "" },
  { id: 12, name: "Edit video content.", filter: "" },
  { id: 13, name: "Plan social media calendar.", filter: "" },
  { id: 14, name: "Update company policies.", filter: "filtered" },
  { id: 15, name: "Compile sales reports.", filter: "" },
  { id: 16, name: "Schedule client calls.", filter: "" },
];
export const Drag5: dataType[] = [
  { id: 1, name: "Update website images." },
  { id: 2, name: "Create marketing banners." },
  { id: 3, name: "Revise product descriptions." },
  { id: 4, name: "Set up client meetings." },
  { id: 5, name: "Check email for urgent messages." },
  { id: 6, name: "Proofread customer communications." },
];
export const Drag6: dataType[] = [
  { id: 11, name: "Test software functionality." },
  { id: 12, name: "Brainstorm team-building activities." },
  { id: 13, name: "Format spreadsheet cells." },
  { id: 14, name: "Plan virtual team event." },
  { id: 15, name: "Edit meeting agenda." },
  { id: 16, name: "Compile weekly progress report." },
  { id: 17, name: "Monthly report based on sales." },
];

export const Drag7: dataType[] = [
  { id: 1, name: "Item-1" },
  { id: 2, name: "Item-2" },
  { id: 3, name: "Item-3" },
  { id: 4, name: "Item-4" },
  { id: 5, name: "Item-5" },
  { id: 6, name: "Item-6" },
  { id: 7, name: "Item-7" },
  { id: 8, name: "Item-8" },
  { id: 9, name: "Item-9" },
  { id: 10, name: "Item-10" },
  { id: 11, name: "Item-11" },
  { id: 12, name: "Item-12" },
  { id: 13, name: "Item-13" },
  { id: 14, name: "Item-14" },
  { id: 15, name: "Item-15" },
  { id: 16, name: "Item-16" },
  { id: 17, name: "Item-17" },
  { id: 18, name: "Item-18" },
  { id: 19, name: "Item-19" },
  { id: 20, name: "Item-20" },
]

export const Drag8: dataType[] = [
  { id: 1, name: "Update social media profiles." },
  { id: 2, name: "Draft project budget." },
  { id: 3, name: "Brainstorm domain names." },
  { id: 4, name: "Revise resume content." },
  { id: 5, name: "Test website functionality." },
  { id: 6, name: "Edit meeting agenda." },
];

export const Drag9: dataType[] = [
  { id: 11, name: "Create mood board." },
  { id: 12, name: "Design event flyer." },
  { id: 13, name: "Research industry trends." },
  { id: 14, name: "Format spreadsheet cells." },
  { id: 15, name: "Outline marketing strategy." },
  { id: 16, name: "Compile data report." },
];

export const Drag10: dataType[] = [
  { id: 1, name: "Write customer service script." },
  { id: 2, name: "Schedule team training." },
  { id: 3, name: "Edit presentation slides." },
  { id: 4, name: "Generate weekly schedule." },
  { id: 5, name: "Review expense reports." },
  { id: 6, name: "Create product catalog." },
];

interface ListItem {
  id: string;
  name: string;
  children?: ListItem[];
  draggable?:boolean;
  class?:string;
}

export const Drag11: ListItem[] = [
  {
    id: '1.1',
    name: 'Item 1.1',
    children: [
      { id: '2.1', name: 'Item 2.1', class:"nested-2" },
      { id: '2.2', name: 'Item 2.2', children: [
          { id: '3.1', name: 'Item 3.1' },
          { id: '3.2', name: 'Item 3.2' },
          { id: '3.3', name: 'Item 3.3', draggable: false },
        ],
      },
      { id: '2.3', name: 'Item 2.3',class:"nested-2"  },
      { id: '2.4', name: 'Item 2.4', class:"nested-2"  },
    ],
  },
  { id: '1.2', name: 'Item 1.2',class:"nested-1" },
  { id: '1.3', name: 'Item 1.3',class:"nested-1" },
  {
    id: '1.4',
    name: 'Item 1.4',
    children: [
      { id: '2.4', name: 'Item 2.4', draggable: false , class:"nested-2" },
      { id: '2.1', name: 'Item 2.1', class:"nested-2"  },
      { id: '2.2', name: 'Item 2.2', class:"nested-2"  },
    ],
  },
  { id: '1.5', name: 'Item 1.5',class:"nested-1" },
];

