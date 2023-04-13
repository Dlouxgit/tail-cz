# tail-cz

An adapter that adds trailer fields for commitizen.

## Usage

### Global Installation

For a quick global installation of the plugin, simply run the `install.sh` script present in this repo:

```
chmod +x install.sh

./install.sh
```

### Add this adapter

Install this adapter

```
npm install tail-cz
```

Reference it in your `.cz.json` of your project

```json
{
  "path": "node_modules/tail-cz/"
}
```

or use commitizen to init
```
commitizen init tail-cz
```


### Day to day work

Instead of `git commit -m 'Your message'`, you type: `git cz` with this adapter and it prompts you for:

- Type
- Scope
- Subject
- Tails

And generates your commit based on that.

