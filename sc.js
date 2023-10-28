const IPFS = require('ipfs-http-client');
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function uploadToIPFS(metadata) {
  const { cid } = await ipfs.add(JSON.stringify(metadata));
  return `https://ipfs.io/ipfs/${cid}`;
}

// Example usage
const metadata = {
  name: "My NFT",
  description: "An example NFT",
  image: "https://example.com/image.jpg",
};

uploadToIPFS(metadata)
  .then((url) => console.log("Metadata uploaded to IPFS:", url))
  .catch((err) => console.error("Error uploading metadata to IPFS:", err));
