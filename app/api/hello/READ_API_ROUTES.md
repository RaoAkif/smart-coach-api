### GET request in NextJS v13

```js
export async function GET(request: Request) {
  return NextResponse.json({message: "Hello JSON request!})
}
```

### POST request in NextJS v13

```js
export async function POST(request: Request) {
  return NextResponse.json({message: "Hello JSON response!})
}
```
