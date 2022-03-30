export default function Ride({data}) {
    console.log(data);
    return <div>yoo fetch db datat here</div>;
  }

    export async function getServerSideProps(context) {
        const res = await fetch("http://localhost:4000/ride");
        const data = await res.json();
        return { props: { data } };
    }