import React from 'react';
import Layout from '../components/Layout';
import Landing from '../components/design-patterns/Landing';
import Header from '../components/design-patterns/Header';
import AdapterPattern from '../components/design-patterns/patterns/Adapter'
import CompositePattern from '../components/design-patterns/patterns/Composite'
import Footer from '../components/Footer';

const DesignPatternsPage = () => (
  <Layout>
    <Header />
    <Landing />
    <AdapterPattern />
    <CompositePattern />
    <Footer />
  </Layout>
);

export default DesignPatternsPage;
