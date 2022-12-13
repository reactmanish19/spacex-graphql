export interface ILaunchRecordLinks {
  flickr_images: string[];
  __typename: string;
}

export interface IAllLaunchRecords {
  id: string;
  launch_date_local: string;
  links: ILaunchRecordLinks;
  mission_name: string;
  __typename: string;
  rocket: {
    rocket_name: string;
  };
}
