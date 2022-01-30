export const AudioTrackSchema = {
  name: 'AudioTrackSchema',
	primaryKey: "id",
  properties: {
    id: 'int',
    url: 'string',
    title: 'string',
    artist: 'string',
    album: 'string',
    genre: 'string',
    date: 'string',
    artwork: 'string',
    duration: 'int',
  },
};
