# kozy
Next 13 FormData image upload tool via API route

```command
npm i kozy
yarn add kozy
pnpm add kozy
````

It is very easy to use. After installing the package, create a route called upload under the api folder and add the following code.

```javascript
export async function POST(req: NextRequest, res: NextResponse){
  const form: any = await req.formData();
  const file = form.get('avatar');
  
  const uploaded: any = await UploadImage({
      file,
      folder: 'uplods',
      name: `kishkir_${findUser.username}`,
      size: '2 MB',
    });

    return NextResponse.json({ data: uploaded.file, isSuccess: true });
}
