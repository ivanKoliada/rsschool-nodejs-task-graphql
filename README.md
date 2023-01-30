# Graphql

## **GraphQL with Fastify, Mercurius, TypeScript**

## Instractions:

- Make sure that you have v18 LTS Node installed on your computer
- `git clone` https://github.com/ivanKoliada/rsschool-nodejs-task-graphql.git
- Open your newly created folder with your code editor
- Checkout `graphql-basics` branch
- Type `npm i` to install all dependencies.

## How to start:

- To test application run command `npm run test`.
- To start application run command `npm run start`.

## How to use:

> **NOTE:** development with **Mercurius** and **schema-first**

- run app with `npm run start`
- open `http://127.0.0.1:3000/graphiql` in browser

> **NOTE:** you can also use **postman** `http://127.0.0.1:3000/graphql`

## Get gql requests:

- Get users, profiles, posts, memberTypes - 4 operations in one query:

```
query {
  users {  
   id    
   firstName
   lastName
   email
   subscribedToUserIds
  }
  posts {
   id
   title
   content
   userId
  }
  profiles {
   id
   avatar
   sex
   birthday
   country
   street
   city
   memberTypeId
  }
  memberTypes {
   id
   discount
   monthPostsLimit
  }
}
```

- Get user, profile, post, memberType by id - 4 operations in one query:

```
query {	
  user(id: "") {
   id
   firstName
   lastName
   email
   subscribedToUserIds
  }  
  post (id: "") {
   id
   title
   content
   userId
  }
  profile (id: "") {
   id
   avatar
   sex
   birthday
   country
   street
   city
   memberTypeId
  }
  memberTypes (id: "") {
   id
   discount
   monthPostsLimit
  }
}
```

- Get users with their posts, profiles, memberTypes: 

```
query usersWithEntities {
  usersWithEntities {
    id
    firstName
    lastName
    email
    subscribedToUserIds    
    posts{
      id
      title
      content
      userId
    }
    profile{
      id
      avatar
      sex
      birthday
      country
      street
      city
      memberTypeId
      userId
    }
    memberType{
      id
      discount
      monthPostsLimit
    }
  }
}
```

- Get user by id with his posts, profile, memberType:

```
query userWithEntities($id: ID!) {
  userWithEntities(id: $id) {
    id
    firstName
    lastName
    email
    subscribedToUserIds    
    posts{
      id
      title
      content
      userId 
    }
    profile{
      id
      avatar
      sex
      birthday
      country
      street
      city
      memberTypeId
      userId
    }
    memberType{
      id
      discount
      monthPostsLimit
    }
  }
}
```

**variables**

```
{
  "id": ""
}
```

- Get users with their userSubscribedTo, profile:

```
query usersSubscriberProfiles {
  usersSubscriberProfiles{
    id
    firstName
    lastName
    email
    subscribedToUserIds
    subscribedProfile{
      id
      avatar
      sex
      birthday
      country
      street
      city
      memberTypeId
      userId
    }
  }
}
```

- Get user by id with his subscribedToUser, posts

```
query userFollowersPosts($id: ID!) {
  userFollowersPosts(id: $id) {
	id
	firstName
	lastName
	email
	subscribedToUserIds
	subscriberPosts {
		id
		title
		content
		userId
    	}
  }
}
```

**variables**

```
{
  "id": ""
}
```

- Get users with their userSubscribedTo, subscribedToUser:

```
query usersSubscriptions{
  usersSubscriptions{
    id
    firstName
    lastName
    email
    subscribedToUserIds
    userSubscribedTo{
      id
      firstName
      lastName
      email
      subscribedToUserIds
      userSubscribedTo{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
      subscribedToUser{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
    }
    subscribedToUser{
      id
      firstName
      lastName
      email
      subscribedToUserIds
      userSubscribedTo{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
      subscribedToUser{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
    }
  }
}
```

## Create gql requests:

- Create user:

```
mutation createUser($input: CreateUserInput!){
  createUser(input: $input) {
    id
    firstName
    email
  }
}
```

**variables**

```
{
  "input": {
    "firstName": "",
    "lastName": "",
    "email": ""
  }
}
```

- Create profile:

```
mutation createProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    	id
    	avatar
    	sex
	birthday
	country
	street
	city
	memberTypeId
	userId    
  }    
}
```

**variables**

```
{
  "input": {
    "avatar": "",
    "sex": "",
    "birthday": 30,
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": "",
    "userId": ""
  }
}
```

- Create post:

```
mutation createPost($input: CreatePostInput!){
  createPost(input: $input) {
    	id
      	title
    	content
    	userId       
  }
}
```


**variables**

```
{
  "input": {
    "title": "",
    "content": "",
    "userId": ""
  }
}
```

## Update gql requests:

- Update user:

```
mutation updateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }
}
```

**variables**

```
{
  "id": "",
  "input": {
    "firstName": "",
    "lastName": "",
    "email": ""
  }
}
```

- Update profile: 

```
mutation updateProfile($id: ID!, $input: UpdateProfileInput!) {
  updateProfile(id: $id, input: $input) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }
}
```

**variables**

```
{
  "id": "",
  "input": {
    "avatar": "",
    "sex": "",
    "birthday": "",    
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": ""
  }
}
```

- Update post: 

```
mutation updatePost ($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
    content
    userId
  }
}
```

**variables**

```
{	
  "id": "",
  "input": {
    "title": "",
    "content": ""
  }
}
```

- Update memberType:

```
mutation updateMemberType($id: ID!, $input: UpdateMemberTypeInput!) {
  updateMemberType(id: $id, input: $input) {
    id
    discount
    monthPostsLimit
  }
}
```

**variables**

```
{
  "id": "",
  "input": {
    "discount": 5,
    "monthPostsLimit": 10
  }
}
```

- Subscribe to:

```
mutation subscribeToUser($id: ID!, $input: SubscribeToUserInput!) {
	subscribeToUser(id: $id, input: $input) {
    		id
  		firstName
      		lastName
      		email
    		subscribedToUserIds
  	}
}
```

**variables**

```
{
  "id": "",
  "input": {
  	"userId": ""
  }
}
```

- unsubscribe from:

```
mutation unsubscribeFromUser($id: ID!, $input: UnsubscribeFromUserInput!) {
	unsubscribeFromUser(id: $id, input: $input) {
    		id
  		firstName
    		lastName
    		email
    		subscribedToUserIds
  	}
}
```

**variables**

```
{
  "id": "",
  "input": {
  	"userId": ""
  }
}
```

## DataLoader

`development with MercuriusLoaders`

Solved n+1 graphql problem with **MercuriusLoaders** in all places where it should have been used.

https://github.com/ivanKoliada/rsschool-nodejs-task-graphql/blob/dc132de5e29eba685366dbfa081f9d1416e6b16f/src/routes/graphql/dataLoader.ts#L4
https://github.com/ivanKoliada/rsschool-nodejs-task-graphql/blob/dc132de5e29eba685366dbfa081f9d1416e6b16f/src/routes/graphql/resolvers/getUserWithEntities/typeDefs.ts#L5

## Graphql-depth-limit

`development graphql-depth-limit package`

added a new rule (created by "graphql-depth-limit") in validation to limit such nesting to **6** levels max.

https://github.com/ivanKoliada/rsschool-nodejs-task-graphql/blob/dc132de5e29eba685366dbfa081f9d1416e6b16f/src/app.ts#L16

