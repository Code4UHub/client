export type Question = {
  id: number;
  type: 'Open' | 'Closed';
  title: string;
  module: string;
};

export const questionList: Question[] = [
  {
    id: 10,
    title: 'Two Sum',
    type: 'Open',
    module: 'While',
  },
  {
    id: 11,
    title: 'Reverse Linked List',
    type: 'Closed',
    module: 'Recursion',
  },
  {
    id: 12,
    title: 'Valid Parentheses',
    type: 'Open',
    module: 'Stacks',
  },
  {
    id: 13,
    title: 'Merge Intervals',
    type: 'Closed',
    module: 'Arrays',
  },
  {
    id: 14,
    title: 'Binary Tree Inorder Traversal',
    type: 'Open',
    module: 'Trees',
  },
  {
    id: 15,
    title: 'LinkedList Cycle',
    type: 'Closed',
    module: 'Linked List',
  },
  {
    id: 16,
    title: 'Subarray Sum Equals K',
    type: 'Open',
    module: 'Arrays',
  },
  {
    id: 17,
    title: 'Remove Duplicates from Sorted Array',
    type: 'Closed',
    module: 'Arrays',
  },
  {
    id: 18,
    title: 'Implement Trie (Prefix Tree)',
    type: 'Open',
    module: 'Trees',
  },
  {
    id: 19,
    title: 'Valid Palindrome',
    type: 'Closed',
    module: 'Strings',
  },
  {
    id: 20,
    title: 'Counting Bits',
    type: 'Open',
    module: 'Dynamic Programming',
  },
  {
    id: 21,
    title: 'Maximum Depth of Binary Tree',
    type: 'Closed',
    module: 'Trees',
  },
  {
    id: 22,
    title: 'Search in Rotated Sorted Array',
    type: 'Open',
    module: 'Binary Search',
  },
  {
    id: 23,
    title: 'Palindrome Linked List',
    type: 'Closed',
    module: 'Linked List',
  },
  {
    id: 24,
    title: 'Longest Substring Without Repeating Characters',
    type: 'Open',
    module: 'Strings',
  },
];
