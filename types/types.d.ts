export type BlogPost = {
    title: string | null;
    id: string;
    slug: string | null;
    blurb: string | null;
    context: string | null;
    'big tag': string[] | null;
    'small tag': string[] | null;
    themes: string | null;
    timestart: string | null;
    realtimestart: Date;
    timeend: string | null;
    coverImg: {
        url: string;
        type: string;
    } | null;
    indiv: RollUpandLink;
    group: RollUpandLink;
    timecreate: string;
    backgroundColor: string;
    textColor: string;
    upwght: boolean;
    featured: boolean;
};

export type Categories = 'all' | 'development' | 'management' | 'remote work';

export type RollUpandLink =
    | {
          name: string;
          href: string;
      }[]
    | null;

export type DynamicProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export type retrieveMultiSelectT = { [key: string]: Array<string> };
