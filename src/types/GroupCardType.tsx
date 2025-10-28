export type AvatarWithNameProps = {
  id?: string;
  avatar?: string;
  username: string;
  role: string; 
  showRanking?: boolean;
  numPoints?: number;
};

export type GroupCardType = {
  groupName: string;
  members: AvatarWithNameProps[];
  showRanking?: boolean;
  inviteCode?: string;
};