import { createSlice } from '@reduxjs/toolkit';

export const data = [
  {
    id: 1,
    cost: 100,
    title: 'Мой второй день',
    convenience: 4,
    safety: 5,
    population: 5,
    nature: 3,
    places: 'аллея пальм, главный мост',
    images: [
      'https://tecdn.b-cdn.net/img/new/standard/city/040.jpg',
      'https://tecdn.b-cdn.net/img/new/standard/city/041.jpg',
      'https://tecdn.b-cdn.net/img/new/standard/city/039.jpg'
    ],
    name: 'Миша',
    publishDate: '2024-01-15T18:00:12.669170Z'
  },
  {
    id: 2,
    cost: 2342,
    title: 'А где это я?',
    convenience: 5,
    safety: 5,
    population: 5,
    nature: 5,
    places: 'небоскребы',
    images: [
      'https://tecdn.b-cdn.net/img/new/standard/city/042.jpg',
      'https://tecdn.b-cdn.net/img/new/standard/city/043.jpg'
    ],
    name: 'Петя',
    publishDate: '2024-01-14T19:00:12.669170Z'
  },
  {
    id: 3,
    title: 'Мой второй день',
    cost: 10000,
    convenience: 5,
    safety: 4,
    population: 4,
    nature: 5,
    places: 'главный мост',
    images: [
      'https://tecdn.b-cdn.net/img/new/standard/city/044.jpg',
      'https://tecdn.b-cdn.net/img/new/standard/city/045.jpg',
    ],
    name: 'Миша',
    publishDate: '2024-01-12T20:00:12.669170Z'
  }
]

const allPostsSlice = createSlice({
  name: 'allPosts',
  initialState: {
    allPosts: [],
    searchTerm: '',
    filterByPopularity: 'Recent',
    filteringTopics: []
  },
  reducers: {
    setAllPosts(state, action) {
      state.allPosts = [...action.payload];
    },
    toggleReactionToPost(state, action) {
      state.allPosts = [...state.allPosts.map((post) => {
        if (post.id === action.payload.id) {
          if (action.payload.addReaction) {
            return { ...post, reactions: [...post.reactions, action.payload.uid] };
          } else {
            return { ...post, reactions: post.reactions.filter((uid) => uid !== action.payload.uid) };
          }
        }

        return post;
      })];
    },
    togglePostMark(state, action) {
      state.allPosts = [...state.allPosts.map((post) => {
        if (post.id === action.payload.id) {
          if (action.payload.markPost) {
            return { ...post, marked: [...post.marked, action.payload.uid] };
          } else {
            return { ...post, marked: post.marked.filter((uid) => uid !== action.payload.uid) };
          }
        }

        return post;
      })];
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    setFilterByPopularity(state, action) {
      state.filterByPopularity = action.payload;
    },
    addFilteringTopic(state, action) {
      state.filteringTopics.push(action.payload);
    },
    removeFilteringTopic(state, action) {
      state.filteringTopics = [...state.filteringTopics.filter((topic) => topic !== action.payload)];
    }
  }
});

export const allPostsReducer = allPostsSlice.reducer;
export const {
  setAllPosts,
  toggleReactionToPost,
  togglePostMark,
  setSearchTerm,
  setFilterByPopularity,
  addFilteringTopic,
  removeFilteringTopic
} = allPostsSlice.actions;