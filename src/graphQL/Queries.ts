import { gql } from "@apollo/client";

export const LOAD_All_LAUNCHES = (name: string, offset: number) => gql`
  query {
    launchesPast(limit: 10, offset:${offset} find: {mission_name: "${name}"}) {
      launch_date_local
      id
      mission_name
      links {
        flickr_images
      }
      rocket {
        rocket_name
      }
    }
  }
`;

export const LOAD_LAUNCH = (name: string) => gql`
  query {
    launchesPast(
      find: { mission_name: "${name}" }
      limit: 1
    ) {
      mission_name
      links {
        article_link
        video_link
        flickr_images
        wikipedia
      }
    rocket {
      rocket {
        description
        diameter {
          feet
        }
        country
        cost_per_launch
        company
        first_flight
        mass {
          kg
        }
        height {
          feet
        }
      }
      rocket_name
      rocket_type
    }
    details
    ships {
      name
      image
      weight_kg
    }
    launch_year
    launch_site {
      site_name_long
    }
    }
  }
`;
