# tail-cz

An adapter that adds trailer fields for commitizen.

## Usage

### Quick Start

For a quick global installation.

```
npm install tail-cz commitizen -g

tail-cz install
```

### Add this adapter

Install this adapter

```
npm install tail-cz commitizen
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

### Reset tail config

```
tail-cz reset
```

### Day to day work

Instead of `git commit -m 'Your message'`, you type: `git cz` with this adapter and it prompts you for:

- Type
- Scope
- Subject
- Tails

And generates your commit based on that.

