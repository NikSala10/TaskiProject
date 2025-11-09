export type AvatarWithNameProps = {
  id?: string;
  avatar?: string;
  username: string;
  role: string; 
  showRanking?: boolean;
  numPoints?: number;
};

export type GroupCardType = {
  id: string;
  groupName: string;
  members: AvatarWithNameProps[];
  showRanking?: boolean;
  numPoints?: number;
  inviteCode?: string;
  ownerID?: string;
};